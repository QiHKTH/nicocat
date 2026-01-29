import { Card, CardContent } from '@/components/ui/card';

const catProfile = {
  name: "Nico",
  breed: "Tabby Cat (Li Hua)",
  sex: "Male",
  birthday: "2025-05-06",
  arrivedHome: "2025-12-20",
  neuteredDate: "2026-01-14",
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

interface ProfileItemProps {
  label: string;
  value: string;
}

function ProfileItem({ label, value }: ProfileItemProps) {
  return (
    <div className="text-center md:text-left">
      <span className="label-premium block mb-1">{label}</span>
      <span className="text-base font-medium text-foreground">{value}</span>
    </div>
  );
}

export function CatProfile() {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardContent className="p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          <ProfileItem label="Name" value={catProfile.name} />
          <ProfileItem label="Breed" value={catProfile.breed} />
          <ProfileItem label="Sex" value={catProfile.sex} />
          <ProfileItem label="Birthday" value={formatDate(catProfile.birthday)} />
          <ProfileItem label="Arrived Home" value={formatDate(catProfile.arrivedHome)} />
          <ProfileItem label="Neutered" value={formatDate(catProfile.neuteredDate)} />
        </div>
      </CardContent>
    </Card>
  );
}
