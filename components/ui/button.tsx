import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium", {
  variants: {
    variant: {
      default: "bg-cyan-500 text-black hover:bg-cyan-400",
      ghost: "bg-transparent text-slate-200 hover:bg-slate-800",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Button({ className, variant, asChild = false, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}
