/* eslint-disable */

// @ts-nocheck

// This file was automatically generated from the backend Candid interface.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Actor, HttpAgent, type HttpAgentOptions, type ActorConfig, type Agent, type ActorSubclass } from "@icp-sdk/core/agent";
import type { Principal } from "@icp-sdk/core/principal";
import { idlFactory, type _SERVICE } from "./declarations/backend.did";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
function some<T>(value: T): Some<T> {
    return {
        __kind__: "Some",
        value: value
    };
}
function none(): None {
    return {
        __kind__: "None"
    };
}
function isNone<T>(option: Option<T>): option is None {
    return option.__kind__ === "None";
}
function isSome<T>(option: Option<T>): option is Some<T> {
    return option.__kind__ === "Some";
}
function unwrap<T>(option: Option<T>): T {
    if (isNone(option)) {
        throw new Error("unwrap: none");
    }
    return option.value;
}
function candid_some<T>(value: T): [T] {
    return [
        value
    ];
}
function candid_none<T>(): [] {
    return [];
}
function record_opt_to_undefined<T>(arg: T | null): T | undefined {
    return arg == null ? undefined : arg;
}
export class ExternalBlob {
    _blob?: Uint8Array<ArrayBuffer> | null;
    directURL: string;
    onProgress?: (percentage: number) => void = undefined;
    private constructor(directURL: string, blob: Uint8Array<ArrayBuffer> | null){
        if (blob) {
            this._blob = blob;
        }
        this.directURL = directURL;
    }
    static fromURL(url: string): ExternalBlob {
        return new ExternalBlob(url, null);
    }
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob {
        const url = URL.createObjectURL(new Blob([
            new Uint8Array(blob)
        ], {
            type: 'application/octet-stream'
        }));
        return new ExternalBlob(url, blob);
    }
    public async getBytes(): Promise<Uint8Array<ArrayBuffer>> {
        if (this._blob) {
            return this._blob;
        }
        const response = await fetch(this.directURL);
        const blob = await response.blob();
        this._blob = new Uint8Array(await blob.arrayBuffer());
        return this._blob;
    }
    public getDirectURL(): string {
        return this.directURL;
    }
    public withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob {
        this.onProgress = onProgress;
        return this;
    }
}
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: string;
};
export interface QueryInput {
    name: string;
    email: string;
    preferredDates: string;
    message: string;
    preferredTrek: string;
    phone: string;
    budget: string;
    groupSize: bigint;
}
export interface LeadQuery {
    id: bigint;
    status: string;
    name: string;
    createdAt: Timestamp;
    email: string;
    preferredDates: string;
    message: string;
    preferredTrek: string;
    phone: string;
    budget: string;
    groupSize: bigint;
}
export interface UgcPhotoInput {
    photoData: string;
    trekDate: string;
    trekSlug: string;
    trekkerName: string;
}
export interface Trek {
    id: bigint;
    duration: bigint;
    difficulty: string;
    name: string;
    slug: string;
    altitude: bigint;
    description: string;
    distance: bigint;
    isActive: boolean;
    state: string;
    isFeatured: boolean;
    trekType: string;
    category: string;
    rating: number;
    image: string;
    endPoint: string;
    price: bigint;
    reviewCount: bigint;
    startPoint: string;
    bestSeason: string;
    images: Array<string>;
}
export type Result_5 = {
    __kind__: "ok";
    ok: TrailCondition;
} | {
    __kind__: "err";
    err: string;
};
export interface UgcPhoto {
    id: string;
    status: Variant_pending_approved_rejected;
    photoData: string;
    trekDate: string;
    trekSlug: string;
    trekkerName: string;
    uploadedAt: bigint;
}
export type Result_1 = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export type Result_4 = {
    __kind__: "ok";
    ok: UgcPhoto;
} | {
    __kind__: "err";
    err: string;
};
export type Result_7 = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface Booking {
    id: bigint;
    razorpayPaymentId?: string;
    status: string;
    paymentTimestamp?: bigint;
    itemId: bigint;
    paymentStatus: string;
    userId: Principal;
    createdAt: Timestamp;
    email: string;
    razorpaySignature?: string;
    advanceAmount: bigint;
    razorpayOrderId?: string;
    travelerName: string;
    totalAmount: bigint;
    itemName: string;
    itemType: string;
    phone: string;
    bookingRef: string;
    groupSize: bigint;
    batchDate: Timestamp;
    paymentProvider: string;
}
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    isPublished: boolean;
    slug: string;
    tags: Array<string>;
    publishedAt: Timestamp;
    author: string;
    readTime: bigint;
    heroImage: string;
    excerpt: string;
    category: string;
}
export interface TrekInput {
    duration: bigint;
    difficulty: string;
    name: string;
    slug: string;
    altitude: bigint;
    description: string;
    distance: bigint;
    isActive: boolean;
    state: string;
    isFeatured: boolean;
    trekType: string;
    category: string;
    rating: number;
    image: string;
    endPoint: string;
    price: bigint;
    reviewCount: bigint;
    startPoint: string;
    bestSeason: string;
    images: Array<string>;
}
export interface TrekBatchPublic {
    id: bigint;
    trekId: bigint;
    priceOverride?: bigint;
    isActive: boolean;
    totalSlots: bigint;
    availableSlots: bigint;
    batchDate: Timestamp;
}
export type Result_6 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export interface BookingInput {
    itemId: bigint;
    email: string;
    advanceAmount: bigint;
    travelerName: string;
    totalAmount: bigint;
    itemName: string;
    itemType: string;
    phone: string;
    groupSize: bigint;
    batchDate: Timestamp;
}
export interface WeatherCache {
    ttl: bigint;
    fetchedAt: bigint;
    data: string;
    location: string;
}
export type Result_9 = {
    __kind__: "ok";
    ok: Array<Booking>;
} | {
    __kind__: "err";
    err: string;
};
export interface PromoInput {
    expiresAt: Timestamp;
    code: string;
    discountPercent: bigint;
    maxUses: bigint;
}
export type Result = {
    __kind__: "ok";
    ok: Booking;
} | {
    __kind__: "err";
    err: string;
};
export interface TrailCondition {
    updatedAt: bigint;
    notes: string;
    trekSlug: string;
    validUntil: bigint;
    condition: Variant_closed_good_moderate_difficult;
}
export type Result_3 = {
    __kind__: "ok";
    ok: TrekBatchPublic;
} | {
    __kind__: "err";
    err: string;
};
export type Result_10 = {
    __kind__: "ok";
    ok: UserProfile;
} | {
    __kind__: "err";
    err: string;
};
export type Result_8 = {
    __kind__: "ok";
    ok: Array<LeadQuery>;
} | {
    __kind__: "err";
    err: string;
};
export interface Yatra {
    id: bigint;
    name: string;
    bestTime: string;
    slug: string;
    description: string;
    accommodation: string;
    isActive: boolean;
    state: string;
    significance: string;
    howToReach: string;
    image: string;
    price: bigint;
    images: Array<string>;
}
export interface BlogInput {
    title: string;
    content: string;
    isPublished: boolean;
    slug: string;
    tags: Array<string>;
    author: string;
    readTime: bigint;
    heroImage: string;
    excerpt: string;
    category: string;
}
export interface ProfileInput {
    name: string;
    medicalConditions: string;
    email: string;
    experience: string;
    bloodGroup: string;
    phone: string;
}
export interface UserProfile {
    principal: Principal;
    referralCode: string;
    name: string;
    createdAt: Timestamp;
    joinedAt: bigint;
    medicalConditions: string;
    email: string;
    experience: string;
    referredBy?: string;
    bloodGroup: string;
    phone: string;
    walletBalance: bigint;
}
export enum Variant_closed_good_moderate_difficult {
    closed = "closed",
    good = "good",
    moderate = "moderate",
    difficult = "difficult"
}
export enum Variant_pending_approved_rejected {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    addWalletBalance(p: Principal, amount: bigint): Promise<Result_10>;
    approveUgcPhoto(id: string): Promise<Result_4>;
    cancelBooking(id: bigint): Promise<Result_2>;
    createBatch(trekId: bigint, batchDate: Timestamp, totalSlots: bigint, priceOverride: bigint | null): Promise<Result_3>;
    createBlog(input: BlogInput): Promise<Result_1>;
    createBooking(input: BookingInput): Promise<Result_1>;
    createPromoCode(input: PromoInput): Promise<Result_2>;
    createTrek(input: TrekInput): Promise<Result_1>;
    deleteBatch(id: bigint): Promise<Result_6>;
    deleteBlog(id: bigint): Promise<Result_2>;
    deleteTrek(id: bigint): Promise<Result_2>;
    getAllBatches(): Promise<Array<TrekBatchPublic>>;
    getAllBookings(): Promise<Result_9>;
    getAllQueries(): Promise<Result_8>;
    getAllTrailConditions(): Promise<Array<TrailCondition>>;
    getBatchById(id: bigint): Promise<TrekBatchPublic | null>;
    getBlogBySlug(slug: string): Promise<BlogPost | null>;
    getBlogs(): Promise<Array<BlogPost>>;
    getFeaturedTreks(): Promise<Array<Trek>>;
    getPendingUgcPhotos(): Promise<Array<UgcPhoto>>;
    getProfile(): Promise<UserProfile | null>;
    getStats(): Promise<{
        totalTreks: bigint;
        totalQueries: bigint;
        totalBookings: bigint;
        totalUsers: bigint;
    }>;
    getTrailCondition(trekSlug: string): Promise<TrailCondition | null>;
    getTrekBatches(trekId: bigint): Promise<Array<TrekBatchPublic>>;
    getTrekBySlug(slug: string): Promise<Trek | null>;
    getTreks(): Promise<Array<Trek>>;
    getTreksByState(state: string): Promise<Array<Trek>>;
    getUgcPhotosByTrek(trekSlug: string): Promise<Array<UgcPhoto>>;
    getUserBookings(): Promise<Array<Booking>>;
    getUserByReferralCode(code: string): Promise<UserProfile | null>;
    getWeatherCache(location: string): Promise<WeatherCache | null>;
    getYatraBySlug(slug: string): Promise<Yatra | null>;
    getYatras(): Promise<Array<Yatra>>;
    initPayment(bookingId: bigint, amount: bigint, currency: string): Promise<Result_7>;
    processReferral(referralCode: string): Promise<Result_6>;
    rejectUgcPhoto(id: string): Promise<Result_4>;
    saveProfile(input: ProfileInput): Promise<Result_2>;
    setTrailCondition(input: TrailCondition): Promise<Result_5>;
    setWeatherCache(location: string, data: string): Promise<void>;
    submitQuery(input: QueryInput): Promise<Result_1>;
    submitUgcPhoto(input: UgcPhotoInput): Promise<Result_4>;
    updateBatch(id: bigint, availableSlots: bigint | null, isActive: boolean | null): Promise<Result_3>;
    updateBlog(id: bigint, input: BlogInput): Promise<Result_2>;
    updateBookingStatus(id: bigint, status: string): Promise<Result_2>;
    updateQueryStatus(id: bigint, status: string): Promise<Result_2>;
    updateTrek(id: bigint, input: TrekInput): Promise<Result_2>;
    validatePromoCode(code: string): Promise<Result_1>;
    verifyPayment(bookingId: bigint, paymentId: string, signature: string): Promise<Result>;
}
import type { BlogPost as _BlogPost, Booking as _Booking, LeadQuery as _LeadQuery, Result as _Result, Result_1 as _Result_1, Result_10 as _Result_10, Result_2 as _Result_2, Result_3 as _Result_3, Result_4 as _Result_4, Result_5 as _Result_5, Result_6 as _Result_6, Result_7 as _Result_7, Result_8 as _Result_8, Result_9 as _Result_9, Timestamp as _Timestamp, TrailCondition as _TrailCondition, Trek as _Trek, TrekBatchPublic as _TrekBatchPublic, UgcPhoto as _UgcPhoto, UserProfile as _UserProfile, WeatherCache as _WeatherCache, Yatra as _Yatra } from "./declarations/backend.did.d.ts";
export class Backend implements backendInterface {
    constructor(private actor: ActorSubclass<_SERVICE>, private _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, private _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, private processError?: (error: unknown) => never){}
    async addWalletBalance(arg0: Principal, arg1: bigint): Promise<Result_10> {
        if (this.processError) {
            try {
                const result = await this.actor.addWalletBalance(arg0, arg1);
                return from_candid_Result_10_n1(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.addWalletBalance(arg0, arg1);
            return from_candid_Result_10_n1(this._uploadFile, this._downloadFile, result);
        }
    }
    async approveUgcPhoto(arg0: string): Promise<Result_4> {
        if (this.processError) {
            try {
                const result = await this.actor.approveUgcPhoto(arg0);
                return from_candid_Result_4_n6(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.approveUgcPhoto(arg0);
            return from_candid_Result_4_n6(this._uploadFile, this._downloadFile, result);
        }
    }
    async cancelBooking(arg0: bigint): Promise<Result_2> {
        if (this.processError) {
            try {
                const result = await this.actor.cancelBooking(arg0);
                return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.cancelBooking(arg0);
            return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
        }
    }
    async createBatch(arg0: bigint, arg1: Timestamp, arg2: bigint, arg3: bigint | null): Promise<Result_3> {
        if (this.processError) {
            try {
                const result = await this.actor.createBatch(arg0, arg1, arg2, to_candid_opt_n13(this._uploadFile, this._downloadFile, arg3));
                return from_candid_Result_3_n14(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.createBatch(arg0, arg1, arg2, to_candid_opt_n13(this._uploadFile, this._downloadFile, arg3));
            return from_candid_Result_3_n14(this._uploadFile, this._downloadFile, result);
        }
    }
    async createBlog(arg0: BlogInput): Promise<Result_1> {
        if (this.processError) {
            try {
                const result = await this.actor.createBlog(arg0);
                return from_candid_Result_1_n19(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.createBlog(arg0);
            return from_candid_Result_1_n19(this._uploadFile, this._downloadFile, result);
        }
    }
    async createBooking(arg0: BookingInput): Promise<Result_1> {
        if (this.processError) {
            try {
                const result = await this.actor.createBooking(arg0);
                return from_candid_Result_1_n19(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.createBooking(arg0);
            return from_candid_Result_1_n19(this._uploadFile, this._downloadFile, result);
        }
    }
    async createPromoCode(arg0: PromoInput): Promise<Result_2> {
        if (this.processError) {
            try {
                const result = await this.actor.createPromoCode(arg0);
                return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.createPromoCode(arg0);
            return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
        }
    }
    async createTrek(arg0: TrekInput): Promise<Result_1> {
        if (this.processError) {
            try {
                const result = await this.actor.createTrek(arg0);
                return from_candid_Result_1_n19(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.createTrek(arg0);
            return from_candid_Result_1_n19(this._uploadFile, this._downloadFile, result);
        }
    }
    async deleteBatch(arg0: bigint): Promise<Result_6> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteBatch(arg0);
                return from_candid_Result_6_n21(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteBatch(arg0);
            return from_candid_Result_6_n21(this._uploadFile, this._downloadFile, result);
        }
    }
    async deleteBlog(arg0: bigint): Promise<Result_2> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteBlog(arg0);
                return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteBlog(arg0);
            return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
        }
    }
    async deleteTrek(arg0: bigint): Promise<Result_2> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteTrek(arg0);
                return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteTrek(arg0);
            return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
        }
    }
    async getAllBatches(): Promise<Array<TrekBatchPublic>> {
        if (this.processError) {
            try {
                const result = await this.actor.getAllBatches();
                return from_candid_vec_n23(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getAllBatches();
            return from_candid_vec_n23(this._uploadFile, this._downloadFile, result);
        }
    }
    async getAllBookings(): Promise<Result_9> {
        if (this.processError) {
            try {
                const result = await this.actor.getAllBookings();
                return from_candid_Result_9_n24(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getAllBookings();
            return from_candid_Result_9_n24(this._uploadFile, this._downloadFile, result);
        }
    }
    async getAllQueries(): Promise<Result_8> {
        if (this.processError) {
            try {
                const result = await this.actor.getAllQueries();
                return from_candid_Result_8_n29(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getAllQueries();
            return from_candid_Result_8_n29(this._uploadFile, this._downloadFile, result);
        }
    }
    async getAllTrailConditions(): Promise<Array<TrailCondition>> {
        if (this.processError) {
            try {
                const result = await this.actor.getAllTrailConditions();
                return from_candid_vec_n31(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getAllTrailConditions();
            return from_candid_vec_n31(this._uploadFile, this._downloadFile, result);
        }
    }
    async getBatchById(arg0: bigint): Promise<TrekBatchPublic | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getBatchById(arg0);
                return from_candid_opt_n35(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getBatchById(arg0);
            return from_candid_opt_n35(this._uploadFile, this._downloadFile, result);
        }
    }
    async getBlogBySlug(arg0: string): Promise<BlogPost | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getBlogBySlug(arg0);
                return from_candid_opt_n36(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getBlogBySlug(arg0);
            return from_candid_opt_n36(this._uploadFile, this._downloadFile, result);
        }
    }
    async getBlogs(): Promise<Array<BlogPost>> {
        if (this.processError) {
            try {
                const result = await this.actor.getBlogs();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getBlogs();
            return result;
        }
    }
    async getFeaturedTreks(): Promise<Array<Trek>> {
        if (this.processError) {
            try {
                const result = await this.actor.getFeaturedTreks();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getFeaturedTreks();
            return result;
        }
    }
    async getPendingUgcPhotos(): Promise<Array<UgcPhoto>> {
        if (this.processError) {
            try {
                const result = await this.actor.getPendingUgcPhotos();
                return from_candid_vec_n37(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getPendingUgcPhotos();
            return from_candid_vec_n37(this._uploadFile, this._downloadFile, result);
        }
    }
    async getProfile(): Promise<UserProfile | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getProfile();
                return from_candid_opt_n38(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getProfile();
            return from_candid_opt_n38(this._uploadFile, this._downloadFile, result);
        }
    }
    async getStats(): Promise<{
        totalTreks: bigint;
        totalQueries: bigint;
        totalBookings: bigint;
        totalUsers: bigint;
    }> {
        if (this.processError) {
            try {
                const result = await this.actor.getStats();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getStats();
            return result;
        }
    }
    async getTrailCondition(arg0: string): Promise<TrailCondition | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getTrailCondition(arg0);
                return from_candid_opt_n39(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getTrailCondition(arg0);
            return from_candid_opt_n39(this._uploadFile, this._downloadFile, result);
        }
    }
    async getTrekBatches(arg0: bigint): Promise<Array<TrekBatchPublic>> {
        if (this.processError) {
            try {
                const result = await this.actor.getTrekBatches(arg0);
                return from_candid_vec_n23(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getTrekBatches(arg0);
            return from_candid_vec_n23(this._uploadFile, this._downloadFile, result);
        }
    }
    async getTrekBySlug(arg0: string): Promise<Trek | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getTrekBySlug(arg0);
                return from_candid_opt_n40(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getTrekBySlug(arg0);
            return from_candid_opt_n40(this._uploadFile, this._downloadFile, result);
        }
    }
    async getTreks(): Promise<Array<Trek>> {
        if (this.processError) {
            try {
                const result = await this.actor.getTreks();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getTreks();
            return result;
        }
    }
    async getTreksByState(arg0: string): Promise<Array<Trek>> {
        if (this.processError) {
            try {
                const result = await this.actor.getTreksByState(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getTreksByState(arg0);
            return result;
        }
    }
    async getUgcPhotosByTrek(arg0: string): Promise<Array<UgcPhoto>> {
        if (this.processError) {
            try {
                const result = await this.actor.getUgcPhotosByTrek(arg0);
                return from_candid_vec_n37(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getUgcPhotosByTrek(arg0);
            return from_candid_vec_n37(this._uploadFile, this._downloadFile, result);
        }
    }
    async getUserBookings(): Promise<Array<Booking>> {
        if (this.processError) {
            try {
                const result = await this.actor.getUserBookings();
                return from_candid_vec_n26(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getUserBookings();
            return from_candid_vec_n26(this._uploadFile, this._downloadFile, result);
        }
    }
    async getUserByReferralCode(arg0: string): Promise<UserProfile | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getUserByReferralCode(arg0);
                return from_candid_opt_n38(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getUserByReferralCode(arg0);
            return from_candid_opt_n38(this._uploadFile, this._downloadFile, result);
        }
    }
    async getWeatherCache(arg0: string): Promise<WeatherCache | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getWeatherCache(arg0);
                return from_candid_opt_n41(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getWeatherCache(arg0);
            return from_candid_opt_n41(this._uploadFile, this._downloadFile, result);
        }
    }
    async getYatraBySlug(arg0: string): Promise<Yatra | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getYatraBySlug(arg0);
                return from_candid_opt_n42(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getYatraBySlug(arg0);
            return from_candid_opt_n42(this._uploadFile, this._downloadFile, result);
        }
    }
    async getYatras(): Promise<Array<Yatra>> {
        if (this.processError) {
            try {
                const result = await this.actor.getYatras();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getYatras();
            return result;
        }
    }
    async initPayment(arg0: bigint, arg1: bigint, arg2: string): Promise<Result_7> {
        if (this.processError) {
            try {
                const result = await this.actor.initPayment(arg0, arg1, arg2);
                return from_candid_Result_7_n43(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.initPayment(arg0, arg1, arg2);
            return from_candid_Result_7_n43(this._uploadFile, this._downloadFile, result);
        }
    }
    async processReferral(arg0: string): Promise<Result_6> {
        if (this.processError) {
            try {
                const result = await this.actor.processReferral(arg0);
                return from_candid_Result_6_n21(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.processReferral(arg0);
            return from_candid_Result_6_n21(this._uploadFile, this._downloadFile, result);
        }
    }
    async rejectUgcPhoto(arg0: string): Promise<Result_4> {
        if (this.processError) {
            try {
                const result = await this.actor.rejectUgcPhoto(arg0);
                return from_candid_Result_4_n6(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.rejectUgcPhoto(arg0);
            return from_candid_Result_4_n6(this._uploadFile, this._downloadFile, result);
        }
    }
    async saveProfile(arg0: ProfileInput): Promise<Result_2> {
        if (this.processError) {
            try {
                const result = await this.actor.saveProfile(arg0);
                return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.saveProfile(arg0);
            return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
        }
    }
    async setTrailCondition(arg0: TrailCondition): Promise<Result_5> {
        if (this.processError) {
            try {
                const result = await this.actor.setTrailCondition(to_candid_TrailCondition_n45(this._uploadFile, this._downloadFile, arg0));
                return from_candid_Result_5_n48(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.setTrailCondition(to_candid_TrailCondition_n45(this._uploadFile, this._downloadFile, arg0));
            return from_candid_Result_5_n48(this._uploadFile, this._downloadFile, result);
        }
    }
    async setWeatherCache(arg0: string, arg1: string): Promise<void> {
        if (this.processError) {
            try {
                const result = await this.actor.setWeatherCache(arg0, arg1);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.setWeatherCache(arg0, arg1);
            return result;
        }
    }
    async submitQuery(arg0: QueryInput): Promise<Result_1> {
        if (this.processError) {
            try {
                const result = await this.actor.submitQuery(arg0);
                return from_candid_Result_1_n19(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.submitQuery(arg0);
            return from_candid_Result_1_n19(this._uploadFile, this._downloadFile, result);
        }
    }
    async submitUgcPhoto(arg0: UgcPhotoInput): Promise<Result_4> {
        if (this.processError) {
            try {
                const result = await this.actor.submitUgcPhoto(arg0);
                return from_candid_Result_4_n6(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.submitUgcPhoto(arg0);
            return from_candid_Result_4_n6(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateBatch(arg0: bigint, arg1: bigint | null, arg2: boolean | null): Promise<Result_3> {
        if (this.processError) {
            try {
                const result = await this.actor.updateBatch(arg0, to_candid_opt_n13(this._uploadFile, this._downloadFile, arg1), to_candid_opt_n50(this._uploadFile, this._downloadFile, arg2));
                return from_candid_Result_3_n14(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateBatch(arg0, to_candid_opt_n13(this._uploadFile, this._downloadFile, arg1), to_candid_opt_n50(this._uploadFile, this._downloadFile, arg2));
            return from_candid_Result_3_n14(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateBlog(arg0: bigint, arg1: BlogInput): Promise<Result_2> {
        if (this.processError) {
            try {
                const result = await this.actor.updateBlog(arg0, arg1);
                return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateBlog(arg0, arg1);
            return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateBookingStatus(arg0: bigint, arg1: string): Promise<Result_2> {
        if (this.processError) {
            try {
                const result = await this.actor.updateBookingStatus(arg0, arg1);
                return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateBookingStatus(arg0, arg1);
            return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateQueryStatus(arg0: bigint, arg1: string): Promise<Result_2> {
        if (this.processError) {
            try {
                const result = await this.actor.updateQueryStatus(arg0, arg1);
                return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateQueryStatus(arg0, arg1);
            return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateTrek(arg0: bigint, arg1: TrekInput): Promise<Result_2> {
        if (this.processError) {
            try {
                const result = await this.actor.updateTrek(arg0, arg1);
                return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateTrek(arg0, arg1);
            return from_candid_Result_2_n11(this._uploadFile, this._downloadFile, result);
        }
    }
    async validatePromoCode(arg0: string): Promise<Result_1> {
        if (this.processError) {
            try {
                const result = await this.actor.validatePromoCode(arg0);
                return from_candid_Result_1_n19(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.validatePromoCode(arg0);
            return from_candid_Result_1_n19(this._uploadFile, this._downloadFile, result);
        }
    }
    async verifyPayment(arg0: bigint, arg1: string, arg2: string): Promise<Result> {
        if (this.processError) {
            try {
                const result = await this.actor.verifyPayment(arg0, arg1, arg2);
                return from_candid_Result_n51(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.verifyPayment(arg0, arg1, arg2);
            return from_candid_Result_n51(this._uploadFile, this._downloadFile, result);
        }
    }
}
function from_candid_Booking_n27(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _Booking): Booking {
    return from_candid_record_n28(_uploadFile, _downloadFile, value);
}
function from_candid_Result_10_n1(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _Result_10): Result_10 {
    return from_candid_variant_n2(_uploadFile, _downloadFile, value);
}
function from_candid_Result_1_n19(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _Result_1): Result_1 {
    return from_candid_variant_n20(_uploadFile, _downloadFile, value);
}
function from_candid_Result_2_n11(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _Result_2): Result_2 {
    return from_candid_variant_n12(_uploadFile, _downloadFile, value);
}
function from_candid_Result_3_n14(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _Result_3): Result_3 {
    return from_candid_variant_n15(_uploadFile, _downloadFile, value);
}
function from_candid_Result_4_n6(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _Result_4): Result_4 {
    return from_candid_variant_n7(_uploadFile, _downloadFile, value);
}
function from_candid_Result_5_n48(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _Result_5): Result_5 {
    return from_candid_variant_n49(_uploadFile, _downloadFile, value);
}
function from_candid_Result_6_n21(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _Result_6): Result_6 {
    return from_candid_variant_n22(_uploadFile, _downloadFile, value);
}
function from_candid_Result_7_n43(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _Result_7): Result_7 {
    return from_candid_variant_n44(_uploadFile, _downloadFile, value);
}
function from_candid_Result_8_n29(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _Result_8): Result_8 {
    return from_candid_variant_n30(_uploadFile, _downloadFile, value);
}
function from_candid_Result_9_n24(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _Result_9): Result_9 {
    return from_candid_variant_n25(_uploadFile, _downloadFile, value);
}
function from_candid_Result_n51(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _Result): Result {
    return from_candid_variant_n52(_uploadFile, _downloadFile, value);
}
function from_candid_TrailCondition_n32(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _TrailCondition): TrailCondition {
    return from_candid_record_n33(_uploadFile, _downloadFile, value);
}
function from_candid_TrekBatchPublic_n16(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _TrekBatchPublic): TrekBatchPublic {
    return from_candid_record_n17(_uploadFile, _downloadFile, value);
}
function from_candid_UgcPhoto_n8(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _UgcPhoto): UgcPhoto {
    return from_candid_record_n9(_uploadFile, _downloadFile, value);
}
function from_candid_UserProfile_n3(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _UserProfile): UserProfile {
    return from_candid_record_n4(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n18(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [bigint]): bigint | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n35(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_TrekBatchPublic]): TrekBatchPublic | null {
    return value.length === 0 ? null : from_candid_TrekBatchPublic_n16(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n36(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_BlogPost]): BlogPost | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n38(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_UserProfile]): UserProfile | null {
    return value.length === 0 ? null : from_candid_UserProfile_n3(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n39(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_TrailCondition]): TrailCondition | null {
    return value.length === 0 ? null : from_candid_TrailCondition_n32(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n40(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_Trek]): Trek | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n41(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_WeatherCache]): WeatherCache | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n42(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_Yatra]): Yatra | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n5(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [string]): string | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_record_n17(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    id: bigint;
    trekId: bigint;
    priceOverride: [] | [bigint];
    isActive: boolean;
    totalSlots: bigint;
    availableSlots: bigint;
    batchDate: _Timestamp;
}): {
    id: bigint;
    trekId: bigint;
    priceOverride?: bigint;
    isActive: boolean;
    totalSlots: bigint;
    availableSlots: bigint;
    batchDate: Timestamp;
} {
    return {
        id: value.id,
        trekId: value.trekId,
        priceOverride: record_opt_to_undefined(from_candid_opt_n18(_uploadFile, _downloadFile, value.priceOverride)),
        isActive: value.isActive,
        totalSlots: value.totalSlots,
        availableSlots: value.availableSlots,
        batchDate: value.batchDate
    };
}
function from_candid_record_n28(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    id: bigint;
    razorpayPaymentId: [] | [string];
    status: string;
    paymentTimestamp: [] | [bigint];
    itemId: bigint;
    paymentStatus: string;
    userId: Principal;
    createdAt: _Timestamp;
    email: string;
    razorpaySignature: [] | [string];
    advanceAmount: bigint;
    razorpayOrderId: [] | [string];
    travelerName: string;
    totalAmount: bigint;
    itemName: string;
    itemType: string;
    phone: string;
    bookingRef: string;
    groupSize: bigint;
    batchDate: _Timestamp;
    paymentProvider: string;
}): {
    id: bigint;
    razorpayPaymentId?: string;
    status: string;
    paymentTimestamp?: bigint;
    itemId: bigint;
    paymentStatus: string;
    userId: Principal;
    createdAt: Timestamp;
    email: string;
    razorpaySignature?: string;
    advanceAmount: bigint;
    razorpayOrderId?: string;
    travelerName: string;
    totalAmount: bigint;
    itemName: string;
    itemType: string;
    phone: string;
    bookingRef: string;
    groupSize: bigint;
    batchDate: Timestamp;
    paymentProvider: string;
} {
    return {
        id: value.id,
        razorpayPaymentId: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.razorpayPaymentId)),
        status: value.status,
        paymentTimestamp: record_opt_to_undefined(from_candid_opt_n18(_uploadFile, _downloadFile, value.paymentTimestamp)),
        itemId: value.itemId,
        paymentStatus: value.paymentStatus,
        userId: value.userId,
        createdAt: value.createdAt,
        email: value.email,
        razorpaySignature: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.razorpaySignature)),
        advanceAmount: value.advanceAmount,
        razorpayOrderId: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.razorpayOrderId)),
        travelerName: value.travelerName,
        totalAmount: value.totalAmount,
        itemName: value.itemName,
        itemType: value.itemType,
        phone: value.phone,
        bookingRef: value.bookingRef,
        groupSize: value.groupSize,
        batchDate: value.batchDate,
        paymentProvider: value.paymentProvider
    };
}
function from_candid_record_n33(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    updatedAt: bigint;
    notes: string;
    trekSlug: string;
    validUntil: bigint;
    condition: {
        closed: null;
    } | {
        good: null;
    } | {
        moderate: null;
    } | {
        difficult: null;
    };
}): {
    updatedAt: bigint;
    notes: string;
    trekSlug: string;
    validUntil: bigint;
    condition: Variant_closed_good_moderate_difficult;
} {
    return {
        updatedAt: value.updatedAt,
        notes: value.notes,
        trekSlug: value.trekSlug,
        validUntil: value.validUntil,
        condition: from_candid_variant_n34(_uploadFile, _downloadFile, value.condition)
    };
}
function from_candid_record_n4(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    principal: Principal;
    referralCode: string;
    name: string;
    createdAt: _Timestamp;
    joinedAt: bigint;
    medicalConditions: string;
    email: string;
    experience: string;
    referredBy: [] | [string];
    bloodGroup: string;
    phone: string;
    walletBalance: bigint;
}): {
    principal: Principal;
    referralCode: string;
    name: string;
    createdAt: Timestamp;
    joinedAt: bigint;
    medicalConditions: string;
    email: string;
    experience: string;
    referredBy?: string;
    bloodGroup: string;
    phone: string;
    walletBalance: bigint;
} {
    return {
        principal: value.principal,
        referralCode: value.referralCode,
        name: value.name,
        createdAt: value.createdAt,
        joinedAt: value.joinedAt,
        medicalConditions: value.medicalConditions,
        email: value.email,
        experience: value.experience,
        referredBy: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.referredBy)),
        bloodGroup: value.bloodGroup,
        phone: value.phone,
        walletBalance: value.walletBalance
    };
}
function from_candid_record_n9(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    id: string;
    status: {
        pending: null;
    } | {
        approved: null;
    } | {
        rejected: null;
    };
    photoData: string;
    trekDate: string;
    trekSlug: string;
    trekkerName: string;
    uploadedAt: bigint;
}): {
    id: string;
    status: Variant_pending_approved_rejected;
    photoData: string;
    trekDate: string;
    trekSlug: string;
    trekkerName: string;
    uploadedAt: bigint;
} {
    return {
        id: value.id,
        status: from_candid_variant_n10(_uploadFile, _downloadFile, value.status),
        photoData: value.photoData,
        trekDate: value.trekDate,
        trekSlug: value.trekSlug,
        trekkerName: value.trekkerName,
        uploadedAt: value.uploadedAt
    };
}
function from_candid_variant_n10(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    pending: null;
} | {
    approved: null;
} | {
    rejected: null;
}): Variant_pending_approved_rejected {
    return "pending" in value ? Variant_pending_approved_rejected.pending : "approved" in value ? Variant_pending_approved_rejected.approved : "rejected" in value ? Variant_pending_approved_rejected.rejected : value;
}
function from_candid_variant_n12(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    ok: boolean;
} | {
    err: string;
}): {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: string;
} {
    return "ok" in value ? {
        __kind__: "ok",
        ok: value.ok
    } : "err" in value ? {
        __kind__: "err",
        err: value.err
    } : value;
}
function from_candid_variant_n15(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    ok: _TrekBatchPublic;
} | {
    err: string;
}): {
    __kind__: "ok";
    ok: TrekBatchPublic;
} | {
    __kind__: "err";
    err: string;
} {
    return "ok" in value ? {
        __kind__: "ok",
        ok: from_candid_TrekBatchPublic_n16(_uploadFile, _downloadFile, value.ok)
    } : "err" in value ? {
        __kind__: "err",
        err: value.err
    } : value;
}
function from_candid_variant_n2(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    ok: _UserProfile;
} | {
    err: string;
}): {
    __kind__: "ok";
    ok: UserProfile;
} | {
    __kind__: "err";
    err: string;
} {
    return "ok" in value ? {
        __kind__: "ok",
        ok: from_candid_UserProfile_n3(_uploadFile, _downloadFile, value.ok)
    } : "err" in value ? {
        __kind__: "err",
        err: value.err
    } : value;
}
function from_candid_variant_n20(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    ok: bigint;
} | {
    err: string;
}): {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
} {
    return "ok" in value ? {
        __kind__: "ok",
        ok: value.ok
    } : "err" in value ? {
        __kind__: "err",
        err: value.err
    } : value;
}
function from_candid_variant_n22(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    ok: null;
} | {
    err: string;
}): {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
} {
    return "ok" in value ? {
        __kind__: "ok",
        ok: value.ok
    } : "err" in value ? {
        __kind__: "err",
        err: value.err
    } : value;
}
function from_candid_variant_n25(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    ok: Array<_Booking>;
} | {
    err: string;
}): {
    __kind__: "ok";
    ok: Array<Booking>;
} | {
    __kind__: "err";
    err: string;
} {
    return "ok" in value ? {
        __kind__: "ok",
        ok: from_candid_vec_n26(_uploadFile, _downloadFile, value.ok)
    } : "err" in value ? {
        __kind__: "err",
        err: value.err
    } : value;
}
function from_candid_variant_n30(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    ok: Array<_LeadQuery>;
} | {
    err: string;
}): {
    __kind__: "ok";
    ok: Array<LeadQuery>;
} | {
    __kind__: "err";
    err: string;
} {
    return "ok" in value ? {
        __kind__: "ok",
        ok: value.ok
    } : "err" in value ? {
        __kind__: "err",
        err: value.err
    } : value;
}
function from_candid_variant_n34(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    closed: null;
} | {
    good: null;
} | {
    moderate: null;
} | {
    difficult: null;
}): Variant_closed_good_moderate_difficult {
    return "closed" in value ? Variant_closed_good_moderate_difficult.closed : "good" in value ? Variant_closed_good_moderate_difficult.good : "moderate" in value ? Variant_closed_good_moderate_difficult.moderate : "difficult" in value ? Variant_closed_good_moderate_difficult.difficult : value;
}
function from_candid_variant_n44(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    ok: string;
} | {
    err: string;
}): {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
} {
    return "ok" in value ? {
        __kind__: "ok",
        ok: value.ok
    } : "err" in value ? {
        __kind__: "err",
        err: value.err
    } : value;
}
function from_candid_variant_n49(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    ok: _TrailCondition;
} | {
    err: string;
}): {
    __kind__: "ok";
    ok: TrailCondition;
} | {
    __kind__: "err";
    err: string;
} {
    return "ok" in value ? {
        __kind__: "ok",
        ok: from_candid_TrailCondition_n32(_uploadFile, _downloadFile, value.ok)
    } : "err" in value ? {
        __kind__: "err",
        err: value.err
    } : value;
}
function from_candid_variant_n52(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    ok: _Booking;
} | {
    err: string;
}): {
    __kind__: "ok";
    ok: Booking;
} | {
    __kind__: "err";
    err: string;
} {
    return "ok" in value ? {
        __kind__: "ok",
        ok: from_candid_Booking_n27(_uploadFile, _downloadFile, value.ok)
    } : "err" in value ? {
        __kind__: "err",
        err: value.err
    } : value;
}
function from_candid_variant_n7(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    ok: _UgcPhoto;
} | {
    err: string;
}): {
    __kind__: "ok";
    ok: UgcPhoto;
} | {
    __kind__: "err";
    err: string;
} {
    return "ok" in value ? {
        __kind__: "ok",
        ok: from_candid_UgcPhoto_n8(_uploadFile, _downloadFile, value.ok)
    } : "err" in value ? {
        __kind__: "err",
        err: value.err
    } : value;
}
function from_candid_vec_n23(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: Array<_TrekBatchPublic>): Array<TrekBatchPublic> {
    return value.map((x)=>from_candid_TrekBatchPublic_n16(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n26(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: Array<_Booking>): Array<Booking> {
    return value.map((x)=>from_candid_Booking_n27(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n31(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: Array<_TrailCondition>): Array<TrailCondition> {
    return value.map((x)=>from_candid_TrailCondition_n32(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n37(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: Array<_UgcPhoto>): Array<UgcPhoto> {
    return value.map((x)=>from_candid_UgcPhoto_n8(_uploadFile, _downloadFile, x));
}
function to_candid_TrailCondition_n45(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: TrailCondition): _TrailCondition {
    return to_candid_record_n46(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n13(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: bigint | null): [] | [bigint] {
    return value === null ? candid_none() : candid_some(value);
}
function to_candid_opt_n50(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: boolean | null): [] | [boolean] {
    return value === null ? candid_none() : candid_some(value);
}
function to_candid_record_n46(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    updatedAt: bigint;
    notes: string;
    trekSlug: string;
    validUntil: bigint;
    condition: Variant_closed_good_moderate_difficult;
}): {
    updatedAt: bigint;
    notes: string;
    trekSlug: string;
    validUntil: bigint;
    condition: {
        closed: null;
    } | {
        good: null;
    } | {
        moderate: null;
    } | {
        difficult: null;
    };
} {
    return {
        updatedAt: value.updatedAt,
        notes: value.notes,
        trekSlug: value.trekSlug,
        validUntil: value.validUntil,
        condition: to_candid_variant_n47(_uploadFile, _downloadFile, value.condition)
    };
}
function to_candid_variant_n47(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: Variant_closed_good_moderate_difficult): {
    closed: null;
} | {
    good: null;
} | {
    moderate: null;
} | {
    difficult: null;
} {
    return value == Variant_closed_good_moderate_difficult.closed ? {
        closed: null
    } : value == Variant_closed_good_moderate_difficult.good ? {
        good: null
    } : value == Variant_closed_good_moderate_difficult.moderate ? {
        moderate: null
    } : value == Variant_closed_good_moderate_difficult.difficult ? {
        difficult: null
    } : value;
}
export interface CreateActorOptions {
    agent?: Agent;
    agentOptions?: HttpAgentOptions;
    actorOptions?: ActorConfig;
    processError?: (error: unknown) => never;
}
export function createActor(canisterId: string, _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, options: CreateActorOptions = {}): Backend {
    const agent = options.agent || HttpAgent.createSync({
        ...options.agentOptions
    });
    if (options.agent && options.agentOptions) {
        console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
    }
    const actor = Actor.createActor<_SERVICE>(idlFactory, {
        agent,
        canisterId: canisterId,
        ...options.actorOptions
    });
    return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
