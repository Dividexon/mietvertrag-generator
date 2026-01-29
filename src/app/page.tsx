'use client'

import { useState } from 'react'
import ContractTypeSelector from '@/components/ContractTypeSelector'
import ContractForm from '@/components/ContractForm'
import ContractPreview from '@/components/ContractPreview'

export type ContractType = 'wohnung' | 'gewerbe' | 'garage' | null

export interface ContractData {
  // Vermieter
  vermieterName: string
  vermieterStrasse: string
  vermieterPlz: string
  vermieterOrt: string
  vermieterTelefon: string
  vermieterEmail: string
  
  // Mieter
  mieterName: string
  mieterGeburtsdatum: string
  mieterStrasse: string
  mieterPlz: string
  mieterOrt: string
  mieterTelefon: string
  mieterEmail: string
  
  // Objekt
  objektStrasse: string
  objektPlz: string
  objektOrt: string
  objektEtage: string
  objektWohnflaeche: string
  objektZimmer: string
  objektBeschreibung: string
  
  // Ausstattung
  hatBalkon: boolean
  hatKeller: boolean
  hatStellplatz: boolean
  hatEbk: boolean
  
  // Mietkonditionen
  kaltmiete: string
  nebenkosten: string
  kaution: string
  mietbeginn: string
  befristet: boolean
  befristetBis: string
  kuendigungsfrist: string
  
  // Zusätzliche Optionen
  staffelmiete: boolean
  indexmiete: boolean
  haustiereErlaubt: boolean
  kleinreparaturklausel: boolean
  schoenheitsreparaturen: boolean
}

const initialData: ContractData = {
  vermieterName: '',
  vermieterStrasse: '',
  vermieterPlz: '',
  vermieterOrt: '',
  vermieterTelefon: '',
  vermieterEmail: '',
  mieterName: '',
  mieterGeburtsdatum: '',
  mieterStrasse: '',
  mieterPlz: '',
  mieterOrt: '',
  mieterTelefon: '',
  mieterEmail: '',
  objektStrasse: '',
  objektPlz: '',
  objektOrt: '',
  objektEtage: '',
  objektWohnflaeche: '',
  objektZimmer: '',
  objektBeschreibung: '',
  hatBalkon: false,
  hatKeller: false,
  hatStellplatz: false,
  hatEbk: false,
  kaltmiete: '',
  nebenkosten: '',
  kaution: '',
  mietbeginn: '',
  befristet: false,
  befristetBis: '',
  kuendigungsfrist: '3',
  staffelmiete: false,
  indexmiete: false,
  haustiereErlaubt: false,
  kleinreparaturklausel: true,
  schoenheitsreparaturen: false,
}

export default function Home() {
  const [contractType, setContractType] = useState<ContractType>(null)
  const [step, setStep] = useState(0)
  const [data, setData] = useState<ContractData>(initialData)
  const [showPreview, setShowPreview] = useState(false)

  const handleTypeSelect = (type: ContractType) => {
    setContractType(type)
    setStep(1)
  }

  const handleBack = () => {
    if (showPreview) {
      setShowPreview(false)
    } else if (step > 1) {
      setStep(step - 1)
    } else {
      setContractType(null)
      setStep(0)
    }
  }

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      setShowPreview(true)
    }
  }

  const updateData = (updates: Partial<ContractData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  if (showPreview) {
    return (
      <ContractPreview 
        data={data} 
        contractType={contractType!} 
        onBack={handleBack}
      />
    )
  }

  if (!contractType) {
    return <ContractTypeSelector onSelect={handleTypeSelect} />
  }

  return (
    <ContractForm
      contractType={contractType}
      step={step}
      data={data}
      updateData={updateData}
      onBack={handleBack}
      onNext={handleNext}
    />
  )
}
