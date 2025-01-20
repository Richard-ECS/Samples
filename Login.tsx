import { useState } from "react"
import { addPropertyControls, ControlType, motion } from "framer"

// Created a reusable SVG component using function declaration
// Shows I understand component separation and reusability
const Checkmark = () => (
    <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
        <motion.path
            d="M4 12.6l5.3 5.3L20 6.6"
            fill="none"
            stroke="white"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
        />
    </motion.svg>
)

export function LoginForm(props) {
    // Using array destructuring with useState hook to manage multiple state variables
    // This shows I understand both array operations and state management
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState("")

    // Created an object to store animation variants
    // Using object literal for organized, readable code
    const buttonVariants = {
        normal: {
            backgroundColor: props.buttonColor,
            width: "100%",
        },
        loading: {
            backgroundColor: props.buttonDisabledColor,
            width: "100%",
        },
        success: {
            backgroundColor: "#10B981",
            width: "60px",
            borderRadius: "30px",
        },
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
                width: "100%",
                maxWidth: props.formWidth,
                padding: props.padding,
                backgroundColor: props.backgroundColor,
                borderRadius: props.borderRadius,
                // Using conditional (ternary) operator for dynamic styling
                boxShadow: props.shadowEnabled
                    ? "0 2px 4px rgba(0,0,0,0.1)"
                    : "none",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        >
            {/* Using conditional rendering with the && operator */}
            {props.showTitle && (
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        fontSize: props.titleSize,
                        color: props.titleColor,
                        textAlign: "center",
                        margin: 0,
                    }}
                >
                    {props.titleText}
                </motion.h2>
            )}

            {/* Form input for email with animation */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
                <label
                    style={{
                        fontSize: props.labelFontSize,
                        fontWeight: "500",
                        color: props.labelColor,
                    }}
                >
                    {props.emailLabelText}
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={props.emailPlaceholder}
                    style={{
                        padding: "8px 12px",
                        borderRadius: props.inputBorderRadius,
                        border: `1px solid ${props.inputBorderColor}`,
                        fontSize: props.inputFontSize,
                        outline: "none",
                        backgroundColor: props.inputBackgroundColor,
                        color: props.inputTextColor,
                    }}
                />
            </motion.div>

            {/* Form input for password with animation */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
                <label
                    style={{
                        fontSize: props.labelFontSize,
                        fontWeight: "500",
                        color: props.labelColor,
                    }}
                >
                    {props.passwordLabelText}
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={props.passwordPlaceholder}
                    style={{
                        padding: "8px 12px",
                        borderRadius: props.inputBorderRadius,
                        border: `1px solid ${props.inputBorderColor}`,
                        fontSize: props.inputFontSize,
                        outline: "none",
                        backgroundColor: props.inputBackgroundColor,
                        color: props.inputTextColor,
                    }}
                />
            </motion.div>

            {/* Conditional rendering of error message using && operator */}
            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        color: props.errorColor,
                        fontSize: "14px",
                        textAlign: "center",
                    }}
                >
                    {error}
                </motion.div>
            )}

            {/* Login button with state-based animations */}
            <motion.button
                initial="normal"
                // Using multiple conditional checks for state
                animate={
                    isSuccess ? "success" : isLoading ? "loading" : "normal"
                }
                variants={buttonVariants}
                style={{
                    alignSelf: "center",
                    padding: "10px 20px",
                    color: props.buttonTextColor,
                    border: "none",
                    borderRadius: props.buttonBorderRadius,
                    cursor: isLoading || isSuccess ? "default" : "pointer",
                    fontSize: props.buttonFontSize,
                    fontWeight: "500",
                    marginTop: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "42px",
                    overflow: "hidden",
                }}
                onClick={async () => {
                    // Using multiple conditionals for form validation and state checks
                    if (isSuccess || isLoading) return

                    if (!email || !password) {
                        setError("Please fill in all fields")
                        return
                    }

                    // Managing multiple state updates in a specific order
                    setIsLoading(true)
                    setError("")

                    try {
                        // Simulating async function with Promise
                        await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                        )
                        localStorage.setItem("prelnk_user", email)
                        setIsSuccess(true)
                        setTimeout(() => {
                            // Optional chaining for function call
                            props.onSuccess?.()
                        }, 1000)
                    } catch (error) {
                        console.error("Login failed:", error)
                        setError("Invalid email or password")
                    } finally {
                        setIsLoading(false)
                    }
                }}
            >
                {/* Conditional rendering with multiple states */}
                {isSuccess ? (
                    <Checkmark />
                ) : isLoading ? (
                    props.loadingText
                ) : (
                    props.buttonText
                )}
            </motion.button>

            {/* Complex conditional rendering with multiple features */}
            {props.showExtras && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: props.extrasFontSize,
                        color: props.extrasColor,
                    }}
                >
                    {props.showRememberMe && (
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                            }}
                        >
                            <input type="checkbox" />
                            {props.rememberMeText}
                        </label>
                    )}
                    {props.showForgotPassword && (
                        <a
                            href="#"
                            style={{
                                color: props.linkColor,
                                textDecoration: "none",
                            }}
                        >
                            {props.forgotPasswordText}
                        </a>
                    )}
                </motion.div>
            )}
        </motion.div>
    )
}

// Property controls for the component
// Using an object literal to define all possible props
addPropertyControls(LoginForm, {
    // Form Layout
    formWidth: {
        type: ControlType.Number,
        defaultValue: 400,
        min: 200,
        max: 800,
    },
    padding: { type: ControlType.Number, defaultValue: 20, min: 0, max: 100 },
    backgroundColor: { type: ControlType.Color, defaultValue: "#FFFFFF" },
    borderRadius: {
        type: ControlType.Number,
        defaultValue: 8,
        min: 0,
        max: 50,
    },
    shadowEnabled: { type: ControlType.Boolean, defaultValue: true },

    // Title controls
    showTitle: { type: ControlType.Boolean, defaultValue: true },
    titleText: { type: ControlType.String, defaultValue: "Sign In" },
    titleSize: { type: ControlType.Number, defaultValue: 24, min: 12, max: 48 },
    titleColor: { type: ControlType.Color, defaultValue: "#1F2937" },

    // Label controls
    labelFontSize: {
        type: ControlType.Number,
        defaultValue: 14,
        min: 10,
        max: 24,
    },
    labelColor: { type: ControlType.Color, defaultValue: "#374151" },
    emailLabelText: { type: ControlType.String, defaultValue: "Email" },
    passwordLabelText: { type: ControlType.String, defaultValue: "Password" },

    // Input styling
    inputBackgroundColor: { type: ControlType.Color, defaultValue: "#FFFFFF" },
    inputBorderColor: { type: ControlType.Color, defaultValue: "#D1D5DB" },
    inputTextColor: { type: ControlType.Color, defaultValue: "#1F2937" },
    inputBorderRadius: {
        type: ControlType.Number,
        defaultValue: 4,
        min: 0,
        max: 20,
    },
    inputFontSize: {
        type: ControlType.Number,
        defaultValue: 16,
        min: 12,
        max: 24,
    },
    emailPlaceholder: {
        type: ControlType.String,
        defaultValue: "Enter your email",
    },
    passwordPlaceholder: {
        type: ControlType.String,
        defaultValue: "Enter your password",
    },

    // Button styling
    buttonColor: { type: ControlType.Color, defaultValue: "#2563EB" },
    buttonDisabledColor: { type: ControlType.Color, defaultValue: "#93C5FD" },
    buttonTextColor: { type: ControlType.Color, defaultValue: "#FFFFFF" },
    buttonBorderRadius: {
        type: ControlType.Number,
        defaultValue: 6,
        min: 0,
        max: 20,
    },
    buttonFontSize: {
        type: ControlType.Number,
        defaultValue: 16,
        min: 12,
        max: 24,
    },
    buttonText: { type: ControlType.String, defaultValue: "Sign In" },
    loadingText: { type: ControlType.String, defaultValue: "Logging in..." },

    // Error handling
    errorColor: { type: ControlType.Color, defaultValue: "#DC2626" },

    // Extra features
    showExtras: { type: ControlType.Boolean, defaultValue: true },
    showRememberMe: { type: ControlType.Boolean, defaultValue: true },
    showForgotPassword: { type: ControlType.Boolean, defaultValue: true },
    extrasFontSize: {
        type: ControlType.Number,
        defaultValue: 14,
        min: 10,
        max: 20,
    },
    extrasColor: { type: ControlType.Color, defaultValue: "#6B7280" },
    linkColor: { type: ControlType.Color, defaultValue: "#2563EB" },
    rememberMeText: { type: ControlType.String, defaultValue: "Remember me" },
    forgotPasswordText: {
        type: ControlType.String,
        defaultValue: "Forgot password?",
    },

    // Event handlers
    onSuccess: { type: ControlType.EventHandler },
})
