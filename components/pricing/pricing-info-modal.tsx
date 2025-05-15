"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { pricingPlans } from "@/data/pricing-plans"
import { Calculator, Check, Info, Users, Clock, AlertTriangle, Download, MessageSquare, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import BaseModal from "@/components/ui/base-modal"

interface PricingInfoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PricingInfoModal({ isOpen, onClose }: PricingInfoModalProps) {
  const [activeTab, setActiveTab] = useState("calculation")

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="How our pricing works"
      description="Learn about our pricing model, audio usage and voice designer"
      className="max-w-[750px]"
      contentClassName="p-0"
    >
      <Tabs defaultValue="calculation" value={activeTab} onValueChange={setActiveTab} className="relative">
        <div className="sticky top-0 z-10 bg-background pt-6 pb-4 px-6 border-b">
          <TabsList className="h-12 p-1 bg-muted/40 rounded-xl w-full">
            <TabsTrigger
              value="calculation"
              className={cn(
                "h-10 rounded-lg text-sm font-medium transition-all duration-200 flex-1",
                "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800",
                "data-[state=active]:text-primary data-[state=active]:shadow-sm",
                "hover:bg-muted/80 dark:hover:bg-gray-700/50",
                "flex items-center justify-center gap-2",
              )}
            >
              <Calculator className="h-4 w-4" />
              <span>Audio Usage</span>
            </TabsTrigger>
            <TabsTrigger
              value="voices"
              className={cn(
                "h-10 rounded-lg text-sm font-medium transition-all duration-200 flex-1",
                "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800",
                "data-[state=active]:text-primary data-[state=active]:shadow-sm",
                "hover:bg-muted/80 dark:hover:bg-gray-700/50",
                "flex items-center justify-center gap-2",
              )}
            >
              <Users className="h-4 w-4" />
              <span>Voice Designer</span>
            </TabsTrigger>
            <TabsTrigger
              value="extras"
              className={cn(
                "h-10 rounded-lg text-sm font-medium transition-all duration-200 flex-1",
                "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800",
                "data-[state=active]:text-primary data-[state=active]:shadow-sm",
                "hover:bg-muted/80 dark:hover:bg-gray-700/50",
                "flex items-center justify-center gap-2",
              )}
            >
              <Clock className="h-4 w-4" />
              <span>Extra Time & Upgrades</span>
            </TabsTrigger>
          </TabsList>
          {/* Subtle shadow for depth */}
          <div className="h-2 bg-gradient-to-b from-background to-transparent absolute bottom-0 left-0 right-0 pointer-events-none"></div>
        </div>

        <div className="px-6 pt-6 pb-8">
          <TabsContent
            value="calculation"
            className="space-y-8 px-1 animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:duration-300"
          >
            <section className="space-y-5">
              <div className="border-l-4 border-primary pl-4 py-1">
                <h3 className="text-xl font-semibold mb-3">How we calculate your audio usage</h3>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed">
                To make things fair and encourage exploration, we charge gently for audio generation:
              </p>

              <ul className="space-y-3 list-disc pl-6 mt-4">
                <li className="text-base leading-relaxed">A human typically speaks around 150 words per minute.</li>
                <li className="text-base leading-relaxed">
                  <span className="font-medium text-primary">
                    But we only charge based on 300 words per minute—meaning you get twice as much output per minute.
                  </span>
                </li>
              </ul>

              <div className="bg-muted/30 p-5 rounded-lg mt-5 border border-muted">
                <div className="flex items-center mb-3">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  <h4 className="font-semibold text-lg">Examples:</h4>
                </div>
                <ul className="space-y-2 ml-7">
                  <li className="text-base">
                    <span className="font-medium">150-word script:</span> Only counts as 30 seconds of usage
                  </li>
                  <li className="text-base">
                    <span className="font-medium">300-word script:</span> Counts as 1 minute
                  </li>
                  <li className="text-base">
                    <span className="font-medium">600-word script:</span> Counts as 2 minutes
                  </li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground italic">
                  This way, you get more value from your plan, especially if you're tweaking and testing different
                  scripts.
                </p>
              </div>
            </section>

            <div className="my-6 border-t border-border"></div>

            <section className="space-y-5">
              <div className="border-l-4 border-primary pl-4 py-1">
                <h3 className="text-xl font-semibold mb-3">Regeneration & Edits</h3>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed">
                When you want to regenerate part of your script—say a sentence or a word—we currently regenerate the
                full script due to technical limitations. However, we will soon release a feature called 'infilling'
                which allows you to only regenerate a specific word or sentence. In the mean time:
              </p>

              <div className="mt-4">
                <ul className="space-y-3 list-disc pl-6">
                  <li className="text-base leading-relaxed flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>We only charge for the words you selected to regenerate, not the full script.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 p-5 rounded-lg mt-5 border border-muted">
                <div className="flex items-center mb-3">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  <h4 className="font-semibold text-lg">Example:</h4>
                </div>
                <p className="text-base mb-2">Regenerating a 5-word phrase 3 times = 15 words total</p>
                <p className="text-base font-medium">→ 15 words / 300 words per minute = 0.05 minutes of usage</p>
              </div>
            </section>
          </TabsContent>

          <TabsContent
            value="voices"
            className="space-y-8 px-1 animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:duration-300"
          >
            {/* Voice Creation Introduction */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-start">
                <Sparkles className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Designing Voices</h3>
                  <p className="text-base leading-relaxed">
                    Designing voices is a core part of your experience — and good news: At least till the beta ends we
                    don't charge you for designing voices. Whether you're experimenting with different tones, accents,
                    or styles, you're free to design and refine your voices without it affecting your audio usage.
                  </p>
                </div>
              </div>
            </div>

            {/* Voice Limits Table */}
            <section className="space-y-5">
              <div className="border-l-4 border-primary pl-4 py-1">
                <h3 className="text-xl font-semibold mb-3">Voice Limits</h3>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                Each subscription plan comes with a set number of voices you can create and save:
              </p>

              <div className="rounded-lg border overflow-hidden shadow-sm">
                <div className="grid grid-cols-2 bg-muted/70 p-4 text-sm font-semibold">
                  <div>Plan</div>
                  <div>Max Voices</div>
                </div>
                <div className="divide-y">
                  {pricingPlans.map((plan) => (
                    <div key={plan.tier} className="grid grid-cols-2 p-4 text-base hover:bg-muted/20 transition-colors">
                      <div className="font-medium">{plan.tier}</div>
                      <div className="flex items-center">
                        <span className="font-medium">{plan.maxVoices}</span>
                        <span className="ml-1">voices</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Voice Deletion Warning */}
            <section className="space-y-5">
              <div className="border-l-4 border-amber-500 pl-4 py-1">
                <h3 className="text-xl font-semibold mb-3">Deleting Voices</h3>
              </div>

              <p className="text-base leading-relaxed">
                Once you've hit the limit for your plan, you'll need to delete an existing voice before creating a new
                one.
              </p>

              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-5 mt-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">Important</h4>
                    <p className="text-amber-800 dark:text-amber-400 text-base">
                      When you delete a voice, we also delete all past sessions and audio history that were made with
                      that voice.
                    </p>
                    <div className="flex items-center mt-3 text-amber-700 dark:text-amber-300">
                      <Download className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Make sure to download anything important first!</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-5 rounded-lg mt-4 border border-muted">
                <div className="flex items-center mb-3">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  <h4 className="font-semibold text-lg">Example:</h4>
                </div>
                <p className="text-base">
                  On the Free plan, you can create 3 voices. To create a 4th, you'll have to delete one of the existing
                  three — and everything linked to it.
                </p>
              </div>
            </section>

            {/* Coming Soon */}
            <section className="bg-muted/20 p-5 rounded-lg border border-muted mt-6">
              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-lg mb-2">Coming Soon</h4>
                  <p className="text-base text-muted-foreground">
                    We're exploring the option to let users buy additional voice slots in the future without upgrading
                    their entire plan. If that's something you'd like, let us know — we're listening!
                  </p>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent
            value="extras"
            className="space-y-8 px-1 animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:duration-300"
          >
            <section className="space-y-5">
              <div className="border-l-4 border-primary pl-4 py-1">
                <h3 className="text-xl font-semibold mb-3">Buying Extra Audio Time</h3>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed mb-5">
                Paid users can buy extra audio time without upgrading to a higher plan:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-muted/20 p-5 rounded-lg border border-muted hover:bg-muted/30 transition-colors">
                  <h4 className="font-medium text-lg mb-3">Starter & Creator Plans</h4>
                  <p className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>30-minute chunks for €5</span>
                  </p>
                </div>

                <div className="bg-muted/20 p-5 rounded-lg border border-muted hover:bg-muted/30 transition-colors">
                  <h4 className="font-medium text-lg mb-3">Professional & Company Plans</h4>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>30-minute chunks for €4</span>
                    </p>
                    <p className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>1-hour chunks for €7</span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed">
                Buying extra time is slightly more expensive for Starter and Creator users, making it more appealing to
                upgrade instead.
              </p>
            </section>

            <div className="my-6 border-t border-border"></div>

            <section className="space-y-5">
              <div className="border-l-4 border-primary pl-4 py-1">
                <h3 className="text-xl font-semibold mb-3">Upgrading Mid-Subscription</h3>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed mb-5">
                If you're on an annual plan and want to upgrade mid-year (e.g., from Creator to Professional):
              </p>

              <ul className="space-y-4 mt-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-base leading-relaxed">
                    You'll pay a pro-rated fee based on your remaining time.
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-base leading-relaxed">
                    Your new audio quota and voice limit apply immediately.
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-base leading-relaxed">
                    Unused time from the previous plan doesn't carry over—you start fresh with the new plan's limits.
                  </span>
                </li>
              </ul>
            </section>
          </TabsContent>
        </div>
      </Tabs>

      <div className="p-6 border-t flex justify-end">
        <Button onClick={onClose} className="px-6">
          Close
        </Button>
      </div>
    </BaseModal>
  )
}
