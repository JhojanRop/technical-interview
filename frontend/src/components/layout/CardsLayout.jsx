import { formatExpirationDate, formatSecretCardNumber } from "@/utils/format";
import { Card } from "../Card";
import Link from "next/link";

export default function CardsLayout ({ cards }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Your cards</h2>
      <div className="grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {
          cards.length > 0
            ?
            cards?.map(card => (
              <Link key={card.id} href={`/card/${card.id}`}>
                <Card {...card} number={formatSecretCardNumber(card.number)} expiration_date={formatExpirationDate(card.expiration_date)} />
              </Link>
            ))
            : (<p>You don't have any registered cards yet.</p>)
        }
      </div>
    </div>
  )
}