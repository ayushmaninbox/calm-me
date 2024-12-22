"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils";

interface EndCallDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function EndCallDialog({ isOpen, onClose, onConfirm }: EndCallDialogProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "sm:max-w-[425px]",
        isMobile && "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] p-6 rounded-xl"
      )}>
        <DialogHeader className={cn(
          isMobile && "space-y-2 text-center"
        )}>
          <DialogTitle className={cn(
            isMobile && "text-lg font-semibold"
          )}>
            end session
          </DialogTitle>
          <DialogDescription className={cn(
            isMobile && "text-sm text-muted-foreground"
          )}>
            are you sure you want to end this session?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={cn(
          "mt-6",
          isMobile && "flex-col gap-3"
        )}>
          <Button
            variant="outline"
            onClick={onClose}
            className={cn(
              isMobile && "w-full h-12 text-base"
            )}
          >
            cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className={cn(
              isMobile && "w-full h-12 text-base"
            )}
          >
            end session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}