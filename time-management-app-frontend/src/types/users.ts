export enum UserRole {
    JOB_SEEKER = 'jobSeeker',
    EMPLOYEE = 'employee',
    EMPLOYER = 'employer',
    ADMIN = 'admin'
}



export enum AccountStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended',
    PENDING_VERIFICATION = 'pendingVerification'
}


export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    language: string;
    timeFormat: '12h' | '24h';
    dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
    weekStart: 'monday' | 'sunday';
}


export interface ContactInfo {
    email: string;
    phone?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
}


export interface ProfessionalInfo {
    title?: string;
    company?: string;
    department?: string;
    skills?: string[];
    experience?: number;
    education?: {
        degree?: string;
        institution?: string;
        year?: number;
    }[];
    resume?: string;
    portfolio?: string;
}


export interface EmployerInfo {
    companyName: string;
    industry?: string;
    companySize?: string;
    foundedYear?: number;
    website?: string;
    description?: string;
    logo?: string;
}


export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // Should not be included in API responses
    role: UserRole;
    status: AccountStatus;
    avatar?: string; // URL to avatar
    contactInfo: ContactInfo;

    // Role-specific information
    professionalInfo?: ProfessionalInfo; // For Job Seeker and Employee
    employerInfo?: EmployerInfo; // For Employer

    // Metadata and preferences
    preferences: UserPreferences;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;

    // Security and authentication information
    emailVerified: boolean;
    twoFactorEnabled: boolean;

    // Time management information
    timezone: string;
    workHours?: {
        start: string; // Format: "HH:MM"
        end: string;   // Format: "HH:MM"
        days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
    };

    // Statistics and metrics
    stats?: {
        totalHoursLogged?: number;
        projectsCompleted?: number;
        tasksCompleted?: number;
        averageHoursPerDay?: number;
    };

    // Permissions and access
    permissions?: string[];
    teams?: string[]; // IDs of teams the user belongs to
}


// Type for authentication
export interface AuthData {
    user: User;
    token: string;
    expiresAt: number; // timestamp
    refreshToken?: string;
}

// Type for API responses
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
}

// Type for login requests
export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

// Type for signup requests
export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
}
