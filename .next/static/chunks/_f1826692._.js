(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_f1826692._.js", {

"[project]/components/theme/theme-provider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeProvider": (()=>ThemeProvider),
    "useTheme": (()=>useTheme)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const initialState = {
    theme: "dark",
    setTheme: ()=>null
};
const ThemeProviderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(initialState);
function ThemeProvider({ children, defaultTheme = "dark" }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultTheme);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            // On mount, read from localStorage if available
            const storedTheme = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('theme') : ("TURBOPACK unreachable", undefined);
            let htmlClass = document.documentElement.classList.contains("dark") ? "dark" : document.documentElement.classList.contains("light") ? "light" : defaultTheme;
            if (storedTheme === "dark" || storedTheme === "light" || storedTheme === "system") {
                htmlClass = storedTheme;
            }
            setTheme(htmlClass);
            setMounted(true);
        }
    }["ThemeProvider.useEffect"], [
        defaultTheme
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            if (!mounted) return;
            const root = window.document.documentElement;
            root.classList.remove("light", "dark");
            if (theme === "system") {
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                root.classList.add(systemTheme);
                localStorage.setItem('theme', 'system');
                return;
            }
            root.classList.add(theme);
            localStorage.setItem('theme', theme);
        }
    }["ThemeProvider.useEffect"], [
        theme,
        mounted
    ]);
    const value = {
        theme,
        setTheme: (theme)=>{
            setTheme(theme);
        // localStorage is updated in the effect above
        }
    };
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeProviderContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme/theme-provider.tsx",
        lineNumber: 69,
        columnNumber: 10
    }, this);
}
_s(ThemeProvider, "O2iXXcoCegWUrHJV7GB0gi7uKwY=");
_c = ThemeProvider;
const useTheme = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeProviderContext);
    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/language/language-provider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "LanguageProvider": (()=>LanguageProvider),
    "useLanguage": (()=>useLanguage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const initialState = {
    language: "en",
    setLanguage: ()=>null,
    t: ()=>"",
    availableLanguages: [
        "en",
        "nl"
    ]
};
const LanguageProviderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(initialState);
// Simple translations
const translations = {
    en: {
        settings: "Settings",
        pricing: "Pricing",
        api: "API",
        support: "Support",
        preferences: "Preferences",
        theme: "Theme",
        language: "Language",
        signOut: "Sign out",
        system: "System",
        light: "Light",
        dark: "Dark",
        english: "English",
        dutch: "Dutch",
        projects: "Projects",
        chat: "Chat",
        chats: "Chats",
        newProject: "New Project",
        newChat: "New Chat",
        favorites: "Favorites",
        recent: "Recent",
        noFavorites: "No favorite chats yet",
        deleteChat: "Delete chat",
        deleteConfirmation: "The chat will be deleted and removed from your chat history. This action cannot be undone.",
        favoriteWarning: "This is a favorite chat",
        typeToConfirm: "To confirm deletion, please type",
        below: "below",
        delete: "Delete",
        cancel: "Cancel",
        searchChats: "Search chats...",
        clearSearch: "Clear search",
        noResults: "No results found",
        tryDifferentSearch: "Try a different search term or clear the search",
        searchSessions: "Search sessions...",
        noSessions: "No sessions found",
        tryDifferentSessionSearch: "Try a different search term or create a new session"
    },
    nl: {
        settings: "Instellingen",
        pricing: "Prijzen",
        api: "API",
        support: "Ondersteuning",
        preferences: "Voorkeuren",
        theme: "Thema",
        language: "Taal",
        signOut: "Uitloggen",
        system: "Systeem",
        light: "Licht",
        dark: "Donker",
        english: "Engels",
        dutch: "Nederlands",
        projects: "Projecten",
        chat: "Chat",
        chats: "Chats",
        newProject: "Nieuw Project",
        newChat: "Nieuwe Chat",
        favorites: "Favorieten",
        recent: "Recent",
        noFavorites: "Nog geen favoriete chats",
        deleteChat: "Chat verwijderen",
        deleteConfirmation: "De chat wordt verwijderd uit je chatgeschiedenis. Deze actie kan niet ongedaan worden gemaakt.",
        favoriteWarning: "Dit is een favoriete chat",
        typeToConfirm: "Om het verwijderen te bevestigen, typ",
        below: "hieronder",
        delete: "Verwijderen",
        cancel: "Annuleren",
        searchChats: "Zoek chats...",
        clearSearch: "Zoekopdracht wissen",
        noResults: "Geen resultaten gevonden",
        tryDifferentSearch: "Probeer een andere zoekterm of wis de zoekopdracht",
        tryDifferentSessionSearch: "Probeer een andere zoekterm of maak een nieuwe sessie aan"
    }
};
function LanguageProvider({ children, defaultLanguage = "en" }) {
    _s();
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultLanguage);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            const saved = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('language') : ("TURBOPACK unreachable", undefined);
            if (saved === "en" || saved === "nl") {
                setLanguageState(saved);
            }
        }
    }["LanguageProvider.useEffect"], []);
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('language', lang);
        }
    };
    // Translation function
    const t = (key)=>{
        return translations[language][key] || key;
    };
    const availableLanguages = [
        "en",
        "nl"
    ];
    const value = {
        language,
        setLanguage,
        t,
        availableLanguages
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageProviderContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/language/language-provider.tsx",
        lineNumber: 137,
        columnNumber: 10
    }, this);
}
_s(LanguageProvider, "3yYm01mJwnIpyACLf0U8pFFhioQ=");
_c = LanguageProvider;
const useLanguage = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageProviderContext);
    if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/navbar/user-menu-via-avatar/admin/plan-context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PlanProvider": (()=>PlanProvider),
    "usePlan": (()=>usePlan)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const PlanContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function PlanProvider({ children, initialPlan = "Free", initialUsedSeconds = 503 }) {
    _s();
    const [currentPlan, setCurrentPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialPlan);
    const [usedSeconds, setUsedSeconds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialUsedSeconds);
    // Add a function to update both plan and usage at once
    const updatePlanAndUsage = (plan, seconds)=>{
        setCurrentPlan(plan);
        setUsedSeconds(seconds);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanContext.Provider, {
        value: {
            currentPlan,
            usedSeconds,
            setCurrentPlan,
            setUsedSeconds,
            updatePlanAndUsage
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/navbar/user-menu-via-avatar/admin/plan-context.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(PlanProvider, "TQKezjmxaBHje5EBWypWcLqvIF0=");
_c = PlanProvider;
function usePlan() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PlanContext);
    if (context === undefined) {
        throw new Error("usePlan must be used within a PlanProvider");
    }
    return context;
}
_s1(usePlan, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "PlanProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/data/user-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Get a date from 2 weeks ago
__turbopack_context__.s({
    "userData": (()=>userData)
});
const getTwoWeeksAgoDate = ()=>{
    const today = new Date();
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(today.getDate() - 14) // Subtract 14 days
    ;
    return twoWeeksAgo.toISOString().split("T")[0] // Return in YYYY-MM-DD format
    ;
};
const userData = {
    username: "fromjasp",
    firstName: "Jasper",
    lastName: "Hartsuijker",
    email: "jasper@stemacteren.nl",
    emailVerified: true,
    bio: "Product designer and developer based in Amsterdam.",
    marketingEmails: true,
    productUpdates: true,
    securityAlerts: true,
    language: "english",
    signupDate: getTwoWeeksAgoDate(),
    lastLogin: "2023-11-28",
    role: "admin"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/api/user-service.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "UserService": (()=>UserService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/user-data.ts [app-client] (ecmascript)");
;
class UserService {
    // In a real implementation, this would fetch from an API or database
    static async getCurrentUser() {
        // Simulate API call with a small delay
        await new Promise((resolve)=>setTimeout(resolve, 100));
        // Convert the mock data to match our interface
        // This mapping ensures we have a consistent data structure
        return {
            id: "1",
            username: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].username,
            firstName: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].firstName,
            lastName: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].lastName,
            email: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].email,
            emailVerified: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].emailVerified,
            bio: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].bio,
            avatarUrl: "/user-avatar.jpeg",
            plan: "Professional",
            signupDate: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].signupDate,
            lastLogin: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].lastLogin,
            preferences: {
                marketingEmails: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].marketingEmails,
                productUpdates: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].productUpdates,
                securityAlerts: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].securityAlerts,
                language: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].language,
                theme: "dark"
            },
            role: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userData"].role || "user"
        };
    }
    static async updateUserProfile(updates) {
        // Simulate API call with a small delay
        await new Promise((resolve)=>setTimeout(resolve, 200));
        // In a real implementation, this would send the updates to an API
        console.log("Updating user profile:", updates);
        // Return the updated user (in a real implementation, this would come from the API)
        const currentUser = await this.getCurrentUser();
        return {
            ...currentUser,
            ...updates
        };
    }
    static async updateUserPreferences(preferences) {
        // Simulate API call
        await new Promise((resolve)=>setTimeout(resolve, 150));
        // In a real implementation, this would send the updates to an API
        console.log("Updating user preferences:", preferences);
        // Return the updated preferences
        const currentUser = await this.getCurrentUser();
        return {
            ...currentUser.preferences,
            ...preferences
        };
    }
    static async getUserStats() {
        // Simulate API call
        await new Promise((resolve)=>setTimeout(resolve, 120));
        // Mock stats data
        return {
            totalSessions: 42,
            totalAudioTime: 18000,
            averageSessionLength: 428
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/contexts/user-context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "UserProvider": (()=>UserProvider),
    "useUser": (()=>useUser)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$user$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/user-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const UserContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function UserProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userStats, setUserStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // DEV-ONLY: Mock user role switcher (bottom right, minimizable, animated, with loading, toggle switch)
    const [devRole, setDevRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [minimized, setMinimized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [switching, setSwitching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dropdownOpen, setDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserProvider.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "development") !== "production" && user && devRole && user.role !== devRole) {
                setSwitching(true);
                setTimeout({
                    "UserProvider.useEffect": ()=>{
                        setUser({
                            ...user,
                            role: devRole
                        });
                        setSwitching(false);
                    }
                }["UserProvider.useEffect"], 400);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["UserProvider.useEffect"], [
        devRole
    ]);
    const fetchUserData = async ()=>{
        try {
            setIsLoading(true);
            const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$user$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].getCurrentUser();
            setUser(userData);
            const stats = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$user$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].getUserStats();
            setUserStats(stats);
            setError(null);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError(err instanceof Error ? err : new Error("Failed to fetch user data"));
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserProvider.useEffect": ()=>{
            fetchUserData();
        }
    }["UserProvider.useEffect"], []);
    const updateProfile = async (updates)=>{
        try {
            setIsLoading(true);
            const updatedUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$user$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].updateUserProfile(updates);
            setUser(updatedUser);
        } catch (err) {
            console.error("Error updating user profile:", err);
            setError(err instanceof Error ? err : new Error("Failed to update user profile"));
            throw err;
        } finally{
            setIsLoading(false);
        }
    };
    const updatePreferences = async (preferences)=>{
        try {
            setIsLoading(true);
            const updatedPreferences = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$user$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].updateUserPreferences(preferences);
            if (user) {
                setUser({
                    ...user,
                    preferences: updatedPreferences
                });
            }
        } catch (err) {
            console.error("Error updating user preferences:", err);
            setError(err instanceof Error ? err : new Error("Failed to update user preferences"));
            throw err;
        } finally{
            setIsLoading(false);
        }
    };
    const refreshUserData = async ()=>{
        await fetchUserData();
    };
    // Helper: get the intended role for the toggle
    const effectiveRole = devRole !== null ? devRole : user?.role;
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen",
            children: "Loading user..."
        }, void 0, false, {
            fileName: "[project]/contexts/user-context.tsx",
            lineNumber: 114,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen text-red-500",
            children: [
                "Error loading user: ",
                error.message
            ]
        }, void 0, true, {
            fileName: "[project]/contexts/user-context.tsx",
            lineNumber: 117,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UserContext.Provider, {
        value: {
            user,
            userStats,
            isLoading,
            error,
            updateProfile,
            updatePreferences,
            refreshUserData
        },
        children: [
            ("TURBOPACK compile-time value", "development") !== "production" && user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-4 right-4 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `transition-all duration-200 ${minimized ? "scale-90 opacity-80" : "scale-100 opacity-100"}`,
                    style: {
                        minWidth: minimized ? 0 : 160
                    },
                    children: minimized ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "flex items-center gap-1 bg-muted text-primary px-3 py-2 rounded-full shadow border border-border hover:bg-muted/70 transition-all",
                        onClick: ()=>setMinimized(false),
                        "aria-label": "Show dev role switcher",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/contexts/user-context.tsx",
                            lineNumber: 144,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/contexts/user-context.tsx",
                        lineNumber: 139,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-muted text-primary px-4 py-3 rounded shadow border border-border flex items-center gap-3 relative min-w-[160px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "flex items-center gap-2 px-3 py-1.5 rounded bg-background border border-border text-primary font-semibold focus:outline-none focus:ring-2 focus:ring-primary",
                                        onClick: ()=>setDropdownOpen((open)=>!open),
                                        "aria-haspopup": "listbox",
                                        "aria-expanded": dropdownOpen,
                                        children: [
                                            effectiveRole === "admin" ? "Admin" : "User",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/contexts/user-context.tsx",
                                                lineNumber: 156,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/contexts/user-context.tsx",
                                        lineNumber: 149,
                                        columnNumber: 19
                                    }, this),
                                    dropdownOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "absolute right-0 mt-2 w-28 bg-background border border-border rounded shadow-lg z-10",
                                        role: "listbox",
                                        tabIndex: -1,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: `px-4 py-2 cursor-pointer hover:bg-muted/50 ${effectiveRole === "admin" ? "text-primary font-bold" : "text-muted-foreground"}`,
                                                onClick: ()=>{
                                                    setDevRole("admin");
                                                    setDropdownOpen(false);
                                                },
                                                role: "option",
                                                "aria-selected": effectiveRole === "admin",
                                                children: "Admin"
                                            }, void 0, false, {
                                                fileName: "[project]/contexts/user-context.tsx",
                                                lineNumber: 164,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: `px-4 py-2 cursor-pointer hover:bg-muted/50 ${effectiveRole === "user" ? "text-primary font-bold" : "text-muted-foreground"}`,
                                                onClick: ()=>{
                                                    setDevRole("user");
                                                    setDropdownOpen(false);
                                                },
                                                role: "option",
                                                "aria-selected": effectiveRole === "user",
                                                children: "User"
                                            }, void 0, false, {
                                                fileName: "[project]/contexts/user-context.tsx",
                                                lineNumber: 172,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/contexts/user-context.tsx",
                                        lineNumber: 159,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/contexts/user-context.tsx",
                                lineNumber: 148,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "ml-2 p-1 rounded-full hover:bg-muted/70 absolute top-2 right-2",
                                onClick: ()=>setMinimized(true),
                                "aria-label": "Minimize dev role switcher",
                                tabIndex: 0,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/contexts/user-context.tsx",
                                    lineNumber: 189,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/contexts/user-context.tsx",
                                lineNumber: 183,
                                columnNumber: 17
                            }, this),
                            switching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute left-1/2 -translate-x-1/2 bottom-1 flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-4 w-4 animate-spin text-primary",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            className: "opacity-25",
                                            cx: "12",
                                            cy: "12",
                                            r: "10",
                                            stroke: "currentColor",
                                            strokeWidth: "4"
                                        }, void 0, false, {
                                            fileName: "[project]/contexts/user-context.tsx",
                                            lineNumber: 193,
                                            columnNumber: 104
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            className: "opacity-75",
                                            fill: "currentColor",
                                            d: "M4 12a8 8 0 018-8v8z"
                                        }, void 0, false, {
                                            fileName: "[project]/contexts/user-context.tsx",
                                            lineNumber: 193,
                                            columnNumber: 205
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/contexts/user-context.tsx",
                                    lineNumber: 193,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/contexts/user-context.tsx",
                                lineNumber: 192,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/contexts/user-context.tsx",
                        lineNumber: 147,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/contexts/user-context.tsx",
                    lineNumber: 134,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/contexts/user-context.tsx",
                lineNumber: 133,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/contexts/user-context.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_s(UserProvider, "FP4g3HTv4CyoL6ohzms5CAKiI0M=");
_c = UserProvider;
function useUser() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
_s1(useUser, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "UserProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/use-toast.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useToast": (()=>useToast)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useToast() {
    _s();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useToast.useCallback[toast]": ({ title, description, duration = 5000, variant = "default" })=>{
            const id = Math.random().toString(36).substring(2, 9);
            const newToast = {
                id,
                title,
                description,
                duration,
                variant
            };
            setToasts({
                "useToast.useCallback[toast]": (prev)=>[
                        ...prev,
                        newToast
                    ]
            }["useToast.useCallback[toast]"]);
            console.log("Toast created:", newToast) // Debug log
            ;
            return id;
        }
    }["useToast.useCallback[toast]"], []);
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useToast.useCallback[dismiss]": (id)=>{
            setToasts({
                "useToast.useCallback[dismiss]": (prev)=>prev.filter({
                        "useToast.useCallback[dismiss]": (toast)=>toast.id !== id
                    }["useToast.useCallback[dismiss]"])
            }["useToast.useCallback[dismiss]"]);
        }
    }["useToast.useCallback[dismiss]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useToast.useEffect": ()=>{
            const timers = [];
            toasts.forEach({
                "useToast.useEffect": (toast)=>{
                    const timer = setTimeout({
                        "useToast.useEffect.timer": ()=>{
                            dismiss(toast.id);
                        }
                    }["useToast.useEffect.timer"], toast.duration);
                    timers.push(timer);
                }
            }["useToast.useEffect"]);
            return ({
                "useToast.useEffect": ()=>{
                    timers.forEach({
                        "useToast.useEffect": (timer)=>clearTimeout(timer)
                    }["useToast.useEffect"]);
                }
            })["useToast.useEffect"];
        }
    }["useToast.useEffect"], [
        toasts,
        dismiss
    ]);
    return {
        toast,
        dismiss,
        toasts
    };
}
_s(useToast, "M3I4UzKLlSr7ZiDNIkKmXUKETjE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/toaster.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toaster": (()=>Toaster)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/use-toast.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Toaster() {
    _s();
    const { toasts, dismiss } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Only render on client
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toaster.useEffect": ()=>{
            setMounted(true);
        }
    }["Toaster.useEffect"], []);
    if (!mounted) return null;
    if (toasts.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2",
        children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
            animate-in slide-in-from-bottom-5 
            rounded-md border border-gray-700 bg-gray-800 p-4 shadow-lg
            ${toast.variant === "success" ? "border-green-500" : ""}
            ${toast.variant === "destructive" ? "border-red-500" : ""}
          `,
                style: {
                    minWidth: "300px",
                    maxWidth: "400px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                toast.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-medium text-white",
                                    children: toast.title
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/toaster.tsx",
                                    lineNumber: 35,
                                    columnNumber: 31
                                }, this),
                                toast.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-gray-300",
                                    children: toast.description
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/toaster.tsx",
                                    lineNumber: 36,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/toaster.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>dismiss(toast.id),
                            className: "ml-4 rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/toaster.tsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/toaster.tsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/toaster.tsx",
                    lineNumber: 33,
                    columnNumber: 11
                }, this)
            }, toast.id, false, {
                fileName: "[project]/components/ui/toaster.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/ui/toaster.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(Toaster, "1qH2xmBQucv10gQOFWQEbIiKXZ4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = Toaster;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/providers.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Providers": (()=>Providers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme/theme-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$language$2f$language$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/language/language-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$navbar$2f$user$2d$menu$2d$via$2d$avatar$2f$admin$2f$plan$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/navbar/user-menu-via-avatar/admin/plan-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$user$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/user-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toaster$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toaster.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        defaultTheme: "dark",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$language$2f$language$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LanguageProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$navbar$2f$user$2d$menu$2d$via$2d$avatar$2f$admin$2f$plan$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlanProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$user$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserProvider"], {
                    children: [
                        children,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toaster$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {}, void 0, false, {
                            fileName: "[project]/app/providers.tsx",
                            lineNumber: 18,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/providers.tsx",
                    lineNumber: 16,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/providers.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/providers.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/providers.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_f1826692._.js.map