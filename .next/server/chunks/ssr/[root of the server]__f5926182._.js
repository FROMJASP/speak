module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/components/theme/theme-provider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeProvider": (()=>ThemeProvider),
    "useTheme": (()=>useTheme)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const initialState = {
    theme: "dark",
    setTheme: ()=>null
};
const ThemeProviderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(initialState);
function ThemeProvider({ children, defaultTheme = "dark" }) {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultTheme);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // On mount, read from localStorage if available
        const storedTheme = ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : null;
        let htmlClass = document.documentElement.classList.contains("dark") ? "dark" : document.documentElement.classList.contains("light") ? "light" : defaultTheme;
        if (storedTheme === "dark" || storedTheme === "light" || storedTheme === "system") {
            htmlClass = storedTheme;
        }
        setTheme(htmlClass);
        setMounted(true);
    }, [
        defaultTheme
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeProviderContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme/theme-provider.tsx",
        lineNumber: 69,
        columnNumber: 10
    }, this);
}
const useTheme = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeProviderContext);
    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
}}),
"[project]/components/language/language-provider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LanguageProvider": (()=>LanguageProvider),
    "useLanguage": (()=>useLanguage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const initialState = {
    language: "en",
    setLanguage: ()=>null,
    t: ()=>""
};
const LanguageProviderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(initialState);
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
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultLanguage);
    // Translation function
    const t = (key)=>{
        return translations[language][key] || key;
    };
    const value = {
        language,
        setLanguage,
        t
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageProviderContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/language/language-provider.tsx",
        lineNumber: 119,
        columnNumber: 10
    }, this);
}
const useLanguage = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageProviderContext);
    if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};
}}),
"[project]/components/admin/plan-context.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PlanProvider": (()=>PlanProvider),
    "usePlan": (()=>usePlan)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const PlanContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function PlanProvider({ children, initialPlan = "Free", initialUsedSeconds = 503 }) {
    const [currentPlan, setCurrentPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialPlan);
    const [usedSeconds, setUsedSeconds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialUsedSeconds);
    // Add a function to update both plan and usage at once
    const updatePlanAndUsage = (plan, seconds)=>{
        setCurrentPlan(plan);
        setUsedSeconds(seconds);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanContext.Provider, {
        value: {
            currentPlan,
            usedSeconds,
            setCurrentPlan,
            setUsedSeconds,
            updatePlanAndUsage
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/admin/plan-context.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
function usePlan() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(PlanContext);
    if (context === undefined) {
        throw new Error("usePlan must be used within a PlanProvider");
    }
    return context;
}
}}),
"[project]/data/user-data.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
    lastLogin: "2023-11-28"
};
}}),
"[project]/lib/api/user-service.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "UserService": (()=>UserService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/user-data.ts [app-ssr] (ecmascript)");
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
            username: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userData"].username,
            firstName: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userData"].firstName,
            lastName: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userData"].lastName,
            email: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userData"].email,
            emailVerified: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userData"].emailVerified,
            bio: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userData"].bio,
            avatarUrl: "/user-avatar.jpeg",
            plan: "Professional",
            signupDate: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userData"].signupDate,
            lastLogin: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userData"].lastLogin,
            preferences: {
                marketingEmails: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userData"].marketingEmails,
                productUpdates: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userData"].productUpdates,
                securityAlerts: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userData"].securityAlerts,
                language: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$user$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userData"].language,
                theme: "dark"
            }
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
}}),
"[project]/contexts/user-context.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "UserProvider": (()=>UserProvider),
    "useUser": (()=>useUser)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$user$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/user-service.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const UserContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function UserProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userStats, setUserStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchUserData = async ()=>{
        try {
            setIsLoading(true);
            const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$user$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserService"].getCurrentUser();
            setUser(userData);
            const stats = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$user$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserService"].getUserStats();
            setUserStats(stats);
            setError(null);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError(err instanceof Error ? err : new Error("Failed to fetch user data"));
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchUserData();
    }, []);
    const updateProfile = async (updates)=>{
        try {
            setIsLoading(true);
            const updatedUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$user$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserService"].updateUserProfile(updates);
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
            const updatedPreferences = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$user$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserService"].updateUserPreferences(preferences);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UserContext.Provider, {
        value: {
            user,
            userStats,
            isLoading,
            error,
            updateProfile,
            updatePreferences,
            refreshUserData
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/user-context.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
function useUser() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
}}),
"[project]/components/ui/use-toast.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useToast": (()=>useToast)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useToast() {
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ title, description, duration = 5000, variant = "default" })=>{
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = {
            id,
            title,
            description,
            duration,
            variant
        };
        setToasts((prev)=>[
                ...prev,
                newToast
            ]);
        console.log("Toast created:", newToast) // Debug log
        ;
        return id;
    }, []);
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setToasts((prev)=>prev.filter((toast)=>toast.id !== id));
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timers = [];
        toasts.forEach((toast)=>{
            const timer = setTimeout(()=>{
                dismiss(toast.id);
            }, toast.duration);
            timers.push(timer);
        });
        return ()=>{
            timers.forEach((timer)=>clearTimeout(timer));
        };
    }, [
        toasts,
        dismiss
    ]);
    return {
        toast,
        dismiss,
        toasts
    };
}
}}),
"[project]/components/ui/toaster.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toaster": (()=>Toaster)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/use-toast.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Toaster() {
    const { toasts, dismiss } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Only render on client
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    if (!mounted) return null;
    if (toasts.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2",
        children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                toast.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-medium text-white",
                                    children: toast.title
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/toaster.tsx",
                                    lineNumber: 35,
                                    columnNumber: 31
                                }, this),
                                toast.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>dismiss(toast.id),
                            className: "ml-4 rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
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
}}),
"[project]/app/providers.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Providers": (()=>Providers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2f$theme$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme/theme-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$language$2f$language$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/language/language-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$plan$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/plan-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$user$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/user-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toaster$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toaster.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2f$theme$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        defaultTheme: "dark",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$language$2f$language$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LanguageProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$plan$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlanProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$user$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserProvider"], {
                    children: [
                        children,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toaster$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {}, void 0, false, {
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
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__f5926182._.js.map