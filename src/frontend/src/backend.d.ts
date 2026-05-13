import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
