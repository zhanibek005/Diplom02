import { getSession, getUserDetails } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

	const [session, user] = await Promise.all([
		getSession(),
		getUserDetails()
	])

	if (!session) {
		return redirect('/')
	}
	return (
		<div className="min-h-screen flex items-center justify-center">
			<h1 className="text-3xl font-bold">{user.email}</h1>
		</div>
	);
}
