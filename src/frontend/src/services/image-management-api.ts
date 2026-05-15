import type { CloudinaryAsset } from "@/lib/images/upload-types";

export interface ManagedImageRecord {
  id: string;
  title?: string;
  alt?: string;
  folder: string;
  url: string;
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  bytes: number;
  createdAt: string;
  tags: string[];
}

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Image API failed (${response.status})`);
  }
  return (await response.json()) as T;
}

/**
 * API contracts for future admin backend (Node/Express/Payload/etc).
 * Keep frontend integrations stable while backend implementation evolves.
 */
export const imageManagementApi = {
  async uploadSingle(file: File, folder: string): Promise<ManagedImageRecord> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    const response = await fetch("/api/images/upload", {
      method: "POST",
      body: formData,
    });
    return parseJson<ManagedImageRecord>(response);
  },

  async uploadMultiple(
    files: File[],
    folder: string,
  ): Promise<ManagedImageRecord[]> {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }
    formData.append("folder", folder);
    const response = await fetch("/api/images/upload/multiple", {
      method: "POST",
      body: formData,
    });
    return parseJson<ManagedImageRecord[]>(response);
  },

  async deleteImage(publicId: string): Promise<{ deleted: boolean }> {
    const response = await fetch(
      `/api/images/${encodeURIComponent(publicId)}`,
      {
        method: "DELETE",
      },
    );
    return parseJson<{ deleted: boolean }>(response);
  },

  async updateImage(
    publicId: string,
    patch: Partial<Pick<ManagedImageRecord, "title" | "alt" | "tags">>,
  ): Promise<ManagedImageRecord> {
    const response = await fetch(
      `/api/images/${encodeURIComponent(publicId)}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      },
    );
    return parseJson<ManagedImageRecord>(response);
  },

  async fetchImages(params: { folder?: string; q?: string; page?: number }) {
    const query = new URLSearchParams();
    if (params.folder) query.set("folder", params.folder);
    if (params.q) query.set("q", params.q);
    if (params.page) query.set("page", String(params.page));
    const response = await fetch(`/api/images?${query.toString()}`);
    return parseJson<{
      items: ManagedImageRecord[];
      page: number;
      total: number;
    }>(response);
  },

  fromCloudinaryAsset(
    asset: CloudinaryAsset,
    folder: string,
  ): ManagedImageRecord {
    return {
      id: `${asset.assetId}:${asset.publicId}`,
      folder,
      url: asset.url,
      secureUrl: asset.secureUrl,
      publicId: asset.publicId,
      width: asset.width,
      height: asset.height,
      bytes: asset.bytes,
      createdAt: asset.createdAt,
      tags: asset.tags,
    };
  },
};
