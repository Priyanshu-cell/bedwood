import { BuyOnPhoneButton } from "@/src/components";
import { HomePage } from "@/src/screens";




export default function Home() {
  return (
    <main className="overflow-hidden">
      <HomePage/>
    
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-100 mr-4">
        <BuyOnPhoneButton />
      </div>
    </main>
  );
}



