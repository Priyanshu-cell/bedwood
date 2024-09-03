import { LargeHeader } from "./large/largeheader"
import { SmallHeader } from "./small/smallheader"

export const Header  = () =>  {
    return (
        <div>
            <SmallHeader/>
            <LargeHeader/>
        </div>
    )
}