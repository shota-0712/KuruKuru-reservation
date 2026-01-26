import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Edit } from 'lucide-react';

interface ProfileEditDialogProps {
    currentFullName: string | null;
    currentCompanyName: string | null;
    onSuccess: () => void;
}

export function ProfileEditDialog({
    currentFullName,
    currentCompanyName,
    onSuccess
}: ProfileEditDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState(currentFullName || '');
    const [companyName, setCompanyName] = useState(currentCompanyName || '');
    const { user, refreshProfile } = useAuth();

    const handleOpenChange = (open: boolean) => {
        if (open) {
            setFullName(currentFullName || '');
            setCompanyName(currentCompanyName || '');
        }
        setOpen(open);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName,
                    company_name: companyName,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', user.id);

            if (error) throw error;

            await refreshProfile();
            onSuccess();
            setOpen(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('プロフィールの更新に失敗しました。');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                    <Edit className="w-3.5 h-3.5 mr-1" />
                    編集
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>プロフィール編集</DialogTitle>
                    <DialogDescription>
                        アカウント情報を変更します。変更内容はすぐに反映されます。
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                お名前
                            </Label>
                            <Input
                                id="name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="col-span-3"
                                placeholder="田中 太郎"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="company" className="text-right">
                                店舗名
                            </Label>
                            <Input
                                id="company"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="col-span-3"
                                placeholder="株式会社LinCal / LinCalサロン"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    保存中
                                </>
                            ) : (
                                '保存'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
