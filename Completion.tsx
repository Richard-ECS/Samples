import { useState, useEffect } from "react"
import { addPropertyControls, ControlType, motion } from "framer"

export function CourseProgress(props) {
    // State management for course progress tracking
    const [progress, setProgress] = useState(0)
    const [totalLessons, setTotalLessons] = useState(0)
    const [completedLessons, setCompletedLessons] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    // Fetch and update course progress when courseId changes
    useEffect(() => {
        const fetchProgress = async () => {
            const userId = localStorage.getItem("prelnk_user")
            if (!userId) {
                setError("Please log in to view progress")
                setIsLoading(false)
                return
            }

            try {
                const response = await fetch(
                    `${props.apiUrl}/api/progress/course`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId,
                            courseId: props.courseId,
                        }),
                    }
                )

                const data = await response.json()
                if (data.success) {
                    setTotalLessons(data.totalLessons)
                    setCompletedLessons(data.completedLessons)
                    setProgress(
                        (data.completedLessons / data.totalLessons) * 100
                    )
                }
            } catch (error) {
                console.error("Error fetching progress:", error)
                setError("Failed to load progress")
            } finally {
                setIsLoading(false)
            }
        }

        fetchProgress()
    }, [props.courseId])

    return (
        <div
            style={{
                width: props.width || "100%",
                maxWidth: props.maxWidth || "300px",
                padding: props.padding || "20px",
                backgroundColor: props.backgroundColor || "#FFFFFF",
                borderRadius: props.borderRadius || "12px",
                boxShadow: props.showShadow
                    ? "0 2px 4px rgba(0,0,0,0.1)"
                    : "none",
            }}
        >
            {/* Component title */}
            <div
                style={{
                    fontSize: props.titleSize || "18px",
                    fontWeight: "600",
                    color: props.titleColor || "#1F2937",
                    marginBottom: "12px",
                }}
            >
                {props.titleText || "Course Progress"}
            </div>

            {/* Animated progress bar */}
            <div
                style={{
                    height: props.barHeight || "8px",
                    backgroundColor: props.barBackgroundColor || "#E5E7EB",
                    borderRadius: (props.barHeight || 8) / 2,
                    overflow: "hidden",
                    marginBottom: "12px",
                }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        height: "100%",
                        backgroundColor: props.progressColor || "#2563EB",
                        borderRadius: (props.barHeight || 8) / 2,
                    }}
                />
            </div>

            {/* Progress statistics */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: props.statsFontSize || "14px",
                    color: props.statsColor || "#6B7280",
                }}
            >
                <div>
                    {completedLessons} of {totalLessons} lessons completed
                </div>
                <div style={{ fontWeight: "600" }}>{Math.round(progress)}%</div>
            </div>

            {/* Loading overlay */}
            {isLoading && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(255,255,255,0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: props.borderRadius || "12px",
                    }}
                >
                    Loading...
                </div>
            )}

            {/* Error message display */}
            {error && (
                <div
                    style={{
                        color: props.errorColor || "#DC2626",
                        fontSize: "14px",
                        textAlign: "center",
                        marginTop: "8px",
                    }}
                >
                    {error}
                </div>
            )}
        </div>
    )
}

// Component property controls
addPropertyControls(CourseProgress, {
    // Content configuration
    titleText: {
        type: ControlType.String,
        defaultValue: "Course Progress",
    },

    // Layout settings
    width: {
        type: ControlType.String,
        defaultValue: "100%",
    },
    maxWidth: {
        type: ControlType.Number,
        defaultValue: 300,
        min: 200,
        max: 800,
    },
    padding: {
        type: ControlType.Number,
        defaultValue: 20,
        min: 0,
        max: 40,
    },

    // API settings
    apiUrl: {
        type: ControlType.String,
        defaultValue: "https://your-api-url.com",
    },
    courseId: {
        type: ControlType.String,
        defaultValue: "course1",
    },

    // Visual configuration
    backgroundColor: {
        type: ControlType.Color,
        defaultValue: "#FFFFFF",
    },
    borderRadius: {
        type: ControlType.Number,
        defaultValue: 12,
        min: 0,
        max: 30,
    },
    showShadow: {
        type: ControlType.Boolean,
        defaultValue: true,
    },

    // Title styling
    titleSize: {
        type: ControlType.Number,
        defaultValue: 18,
        min: 12,
        max: 32,
    },
    titleColor: {
        type: ControlType.Color,
        defaultValue: "#1F2937",
    },

    // Progress bar configuration
    barHeight: {
        type: ControlType.Number,
        defaultValue: 8,
        min: 4,
        max: 20,
    },
    barBackgroundColor: {
        type: ControlType.Color,
        defaultValue: "#E5E7EB",
    },
    progressColor: {
        type: ControlType.Color,
        defaultValue: "#2563EB",
    },

    // Statistics styling
    statsFontSize: {
        type: ControlType.Number,
        defaultValue: 14,
        min: 10,
        max: 20,
    },
    statsColor: {
        type: ControlType.Color,
        defaultValue: "#6B7280",
    },

    // Error styling
    errorColor: {
        type: ControlType.Color,
        defaultValue: "#DC2626",
    },
})
