// src/app/dashboard/provider/services/Restoration/edit/[id]/page.tsx
import EditRestaurantClient from "@/components/dashboard/services/provider/Restoration/liste/edit/[id]";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return <div>Invalid ID</div>;
  }

  return <EditRestaurantClient  />;
}
