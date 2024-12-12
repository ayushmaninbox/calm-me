"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface EndCallDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function EndCallDialog({ isOpen, onClose, onConfirm }: EndCallDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>end session</DialogTitle>
          <DialogDescription>
            are you sure you want to end this session?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            end session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}