import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Download, Trash2, Lock, LogOut } from 'lucide-react';
import { DataEditor } from '@/components/DataEditor';
import { PasswordDialog } from '@/components/PasswordDialog';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import type { WeightRecord } from '@/hooks/useWeightData';

interface ToolBarProps {
  onExport: () => void;
  onClear: () => void;
  hasData: boolean;
  records: WeightRecord[];
  onAddRecord: (weight: number, date: string) => void;
  onDeleteRecord: (date: string) => void;
}

export function ToolBar({ onExport, onClear, hasData, records, onAddRecord, onDeleteRecord }: ToolBarProps) {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const { isAdmin, verifyPassword, logout } = useAdminAccess();
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        disabled={!hasData}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Export CSV
      </Button>
      
      {isAdmin ? (
        <>
          <DataEditor
            records={records}
            onAdd={onAddRecord}
            onDelete={onDeleteRecord}
          />
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={!hasData}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Clear Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-serif">Clear All Data</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all weight records. We recommend exporting your data first.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onClear}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="gap-2 text-muted-foreground"
          >
            <LogOut className="h-4 w-4" />
            退出管理
          </Button>
        </>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPasswordDialog(true)}
          className="gap-2"
        >
          <Lock className="h-4 w-4" />
          管理员
        </Button>
      )}
      
      <PasswordDialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        onVerify={verifyPassword}
      />
    </div>
  );
}
