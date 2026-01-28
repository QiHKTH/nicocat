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
import { Download, Trash2 } from 'lucide-react';

interface ToolBarProps {
  onExport: () => void;
  onClear: () => void;
  hasData: boolean;
}

export function ToolBar({ onExport, onClear, hasData }: ToolBarProps) {
  return (
    <div className="flex gap-3 justify-center">
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        disabled={!hasData}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        导出 CSV
      </Button>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={!hasData}
            className="gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            清空数据
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>清空所有数据</AlertDialogTitle>
            <AlertDialogDescription>
              此操作将删除所有体重记录，且无法恢复。建议先导出数据备份。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={onClear}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              确认清空
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
