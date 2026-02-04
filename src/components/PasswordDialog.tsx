import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (password: string) => boolean;
}

export function PasswordDialog({ open, onOpenChange, onVerify }: PasswordDialogProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onVerify(password)) {
      setPassword('');
      setError(false);
      onOpenChange(false);
    } else {
      setError(true);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setPassword('');
      setError(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle className="font-serif flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Admin Access
          </DialogTitle>
          <DialogDescription>
            Enter password to access edit features
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className={error ? 'border-destructive' : ''}
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive mt-2">Incorrect password, please try again</p>
          )}
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={!password}>
              确认
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
