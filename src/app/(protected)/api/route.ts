import { requireAuth } from "@/lib/auth/session";
import { getUserEvents } from "@/lib/services/eventsService";
import { handleApiError } from "@/lib/utils/error";

export async function GET(request: Request) {
  try {
    const { session } = await requireAuth();

    const { searchParams } = new URL(request.url);
    const idUser = session?.user?.id;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "50", 10);
    const orderByField = searchParams.get("orderByField") ?? undefined;
    const orderDirection = searchParams.get("orderDirection") ?? undefined;

    const data = await getUserEvents(idUser!, {
      page,
      pageSize,
      orderByField,
      orderDirection,
    });

    return Response.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}
