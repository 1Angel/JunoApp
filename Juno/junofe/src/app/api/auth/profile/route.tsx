
export async function GET(request: Request) {

    const cookie = request.headers.get("cookie") ?? "";

    const res = await fetch(`${process.env.API_URL}/auth/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": cookie   // <-- ESTO ES LA CLAVE
        }
    });
    const result = await res.json();

    if (res.ok) {
        return Response.json(result, { status: res.status });
    } else if (res.status == 401) {
        return Response.json(null, { status: res.status });
    }
}