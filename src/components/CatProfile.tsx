import { Card, CardContent } from '@/components/ui/card';

const catProfile = {
  name: "Nico",
  breed: "Tabby",
  sex: "Male",
  birthday: "2025-05-06",
};

const calculateAge = (birthday: string) => {
  const birthDate = new Date(birthday);
  const now = new Date();
  const months = (now.getFullYear() - birthDate.getFullYear()) * 12 
               + (now.getMonth() - birthDate.getMonth());
  
  if (months < 12) return `${months} mo`;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return remainingMonths > 0 
    ? `${years} yr ${remainingMonths} mo` 
    : `${years} year${years > 1 ? 's' : ''}`;
};

interface ProfileItemProps {
  label: string;
  value: string;
}

function ProfileItem({ label, value }: ProfileItemProps) {
  return (
    <div className="text-center">
      <span className="label-premium block mb-1">{label}</span>
      <span className="text-base font-medium text-foreground">{value}</span>
    </div>
  );
}

export function CatProfile() {
  const age = calculateAge(catProfile.birthday);
  
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-center gap-12 md:gap-16">
          <ProfileItem label="Name" value={catProfile.name} />
          <ProfileItem label="Breed" value={catProfile.breed} />
          <ProfileItem label="Sex" value={catProfile.sex} />
          <ProfileItem label="Age" value={age} />
        </div>
      </CardContent>
    </Card>
  );
}
