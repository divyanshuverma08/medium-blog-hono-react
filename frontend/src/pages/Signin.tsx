import { Auth } from "../components/Auth"
import { SideBanner } from "../components/SideBanner"

export const Signin = () => {
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <Auth type="signin"/>
        <SideBanner />
    </div>
}