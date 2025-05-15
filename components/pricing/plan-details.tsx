import { ExternalLink } from "lucide-react"
import LanguageFlag from "./language-flag"
import PlanFeature from "./plan-feature"
import type { PricingPlan } from "@/data/pricing-plans"
import { calculateMonthlyEquivalent, formatPrice } from "@/data/pricing-plans"
import ExtraAudioTime from "@/components/pricing/extra-audio-time"

interface PlanDetailsProps {
  plan: PricingPlan
  billingCycle: "monthly" | "annually"
}

export default function PlanDetails({ plan, billingCycle }: PlanDetailsProps) {
  const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnually
  const monthlyEquivalent = calculateMonthlyEquivalent(plan.priceAnnually)
  const showMonthlyEquivalent = billingCycle === "annually" && plan.priceAnnually > 0

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-3xl font-bold">
          {plan.tier === "Professional" && plan.betaDiscount && billingCycle === "monthly" ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg line-through text-muted-foreground">
                {formatPrice(plan.betaDiscount.regularPrice)}
              </span>
              <span>{formatPrice(price)}</span>
            </div>
          ) : (
            formatPrice(price)
          )}
        </div>
        {showMonthlyEquivalent && (
          <div className="text-sm text-muted-foreground mt-1">{formatPrice(monthlyEquivalent)} per month</div>
        )}
        <div className="flex items-center justify-center gap-1 mt-2">
          <ExtraAudioTime minutes={plan.audioMinutes} className="text-sm" iconClassName="text-primary" />
        </div>
        <div className="text-sm mt-1">
          <span className="text-muted-foreground">Up to </span>
          <span className="font-medium">{plan.maxVoices} voices</span>
        </div>
      </div>

      <div className="space-y-4">
        <PlanFeature
          label="Models"
          value={
            <div className="text-right">
              {plan.models.map((model, index) => (
                <div key={index} className="mb-1 last:mb-0">
                  <span>{model.name}</span>{" "}
                  <span className="inline-flex">
                    {model.languages.map((lang) => (
                      <LanguageFlag key={lang} language={lang} />
                    ))}
                  </span>
                </div>
              ))}
              {plan.experimental && <div className="text-xs text-primary mt-1">+ New experimental models</div>}
            </div>
          }
        />
        <PlanFeature label="Usage" value={plan.usage} />
        <PlanFeature label="API Access" value={plan.apiAccess} />
        <PlanFeature label="Download Quality" value={plan.downloadQuality} />
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <a href="#" className="inline-flex items-center hover:text-primary transition-colors">
          Compare plans and options on our pricing page
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </div>
  )
}
