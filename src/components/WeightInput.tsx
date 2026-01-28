import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WeightInputProps {
  onAdd: (weight: number) => void;
}

export function WeightInput({ onAdd }: WeightInputProps) {
  const [weight, setWeight] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const weightValue = parseFloat(weight);
    
    if (isNaN(weightValue) || weightValue <= 0 || weightValue > 50) {
      toast({
        title: '输入错误',
        description: '请输入有效的体重值 (0.1 - 50 kg)',
        variant: 'destructive',
      });
      return;
    }

    onAdd(Number(weightValue.toFixed(2)));
    setWeight('');
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 2000);
    
    toast({
      title: '记录成功',
      description: `已记录体重 ${weightValue.toFixed(1)} kg`,
    });
  };

  return (
    <Card className="border-border/50">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Input
              type="number"
              step="0.1"
              min="0.1"
              max="50"
              placeholder="输入体重"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="pr-10 text-base h-11"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              kg
            </span>
          </div>
          <Button 
            type="submit" 
            className="h-11 px-6"
            disabled={!weight}
          >
            {showSuccess ? (
              <Check className="h-4 w-4" />
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                记录
              </>
            )}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          今日 {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
        </p>
      </CardContent>
    </Card>
  );
}
