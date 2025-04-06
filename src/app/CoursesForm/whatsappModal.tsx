"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WhatsAppModalProps {
  onClose: () => void;
}

export default function WhatsAppModal({ onClose }: WhatsAppModalProps) {
  const handleWhatsAppRedirect = () => {
    window.open("https://chat.whatsapp.com/JUR3Jj67JYY7INTP3ZbBas", "_blank");
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registration Successful!</DialogTitle>
          <DialogDescription>
            {`You have successfully registered!
              Join our WhatsApp group now to get important updates, learning resources, and support throughout your training.
             We’ve also sent you an email with your payment information and further instructions—please check your inbox (or spam folder) to stay on track.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button onClick={handleWhatsAppRedirect}>Join WhatsApp Group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
