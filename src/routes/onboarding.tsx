import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { interests } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { AppLayout } from '@/layouts/AppLayout'

export const Route = createFileRoute('/onboarding')({
  component: OnboardingComponent,
})

function OnboardingComponent() {
  const navigate = useNavigate()
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const handleSaveInterests = async () => {
    if (selectedInterests.length === 0) {
      alert('Please select at least one interest')
      return
    }

    const user = auth.currentUser
    if (!user) {
      alert('Not authenticated. Please log in again.')
      return
    }

    try {
      setLoading(true)
      const userRef = doc(db, 'users', user.uid)
      
      // Get existing user data
      const userDoc = await getDoc(userRef)
      const existingData = userDoc.data() || {}

      // Update with new interests
      await setDoc(userRef, {
        ...existingData,
        interests: selectedInterests,
        updatedAt: new Date().toISOString(),
      }, { merge: true })

      navigate({ to: '/feed' })
    } catch (error) {
      console.error('Error saving interests:', error)
      alert('Failed to save interests. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    navigate({ to: '/feed' })
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="rounded-3xl glass p-8 md:p-12">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold mb-2">Welcome to ThoughtBridge</h1>
            <p className="text-lg text-muted-foreground">
              Tell us what you're interested in. This helps us recommend relevant conversations and communities.
            </p>
          </div>

          <div className="mb-8">
            <p className="text-sm font-semibold text-muted-foreground mb-4">
              Selected: {selectedInterests.length} / {interests.length}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {interests.map(interest => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`p-4 rounded-2xl transition-all duration-200 font-medium flex flex-col items-center gap-2 ${
                    selectedInterests.includes(interest.id)
                      ? 'glass border-2 border-primary bg-primary/10'
                      : 'glass border-2 border-transparent hover:border-border'
                  }`}
                >
                  <span className="text-3xl">{interest.emoji}</span>
                  <span className="text-sm">{interest.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              onClick={handleSkip}
              variant="outline"
              className="px-6"
              disabled={loading}
            >
              Skip for Now
            </Button>
            <Button
              onClick={handleSaveInterests}
              disabled={selectedInterests.length === 0 || loading}
              className="px-6"
            >
              {loading ? 'Saving...' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
