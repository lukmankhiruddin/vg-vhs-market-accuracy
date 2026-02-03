/**
 * Animated Metric Card Component
 * Features: Count-up animation, hover effects, and visual feedback
 */

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";

interface AnimatedMetricCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  subtitle: string;
  icon?: LucideIcon;
  colorClass?: string;
  isPercentage?: boolean;
  delay?: number;
}

export function AnimatedMetricCard({
  title,
  value,
  suffix = "",
  subtitle,
  icon: Icon,
  colorClass = "text-foreground",
  isPercentage = false,
  delay = 0,
}: AnimatedMetricCardProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const isNumericValue = typeof value === 'number';
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return isPercentage ? latest.toFixed(2) : Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    if (!hasAnimated && isNumericValue) {
      const timer = setTimeout(() => {
        const controls = animate(count, value as number, {
          duration: 1.5,
          ease: "easeOut",
        });
        setHasAnimated(true);
        return controls.stop;
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [count, value, hasAnimated, delay, isNumericValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
    >
      <Card className="bg-card/95 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardDescription className="text-xs uppercase tracking-wider font-medium">
              {title}
            </CardDescription>
            {Icon && (
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-5xl font-bold metric-value ${colorClass}`}>
            {isNumericValue ? (
              <motion.span>{rounded}</motion.span>
            ) : (
              <span>{value}</span>
            )}
            {suffix}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {subtitle}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Animated Progress Bar
interface AnimatedProgressBarProps {
  value: number;
  max?: number;
  colorClass?: string;
  label?: string;
  delay?: number;
}

export function AnimatedProgressBar({
  value,
  max = 100,
  colorClass = "bg-primary",
  label,
  delay = 0,
}: AnimatedProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="font-medium">{label}</span>
          <span className="metric-value">{value.toFixed(1)}%</span>
        </div>
      )}
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colorClass} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: delay / 1000, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// Animated Number Display
interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedNumber({
  value,
  duration = 1.5,
  className = "",
  suffix = "",
  decimals = 0,
}: AnimatedNumberProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count, value, duration]);

  return (
    <span className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
