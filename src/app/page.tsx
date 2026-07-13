"use client"

import { useState } from 'react'
//DATA
export default function Home() {
  const [netWorth, setNetWorth] = useState(0)
  const [assets, setAssets] = useState<{name: string, amount: number}[]>([])
  const [liabilities, setLiabilities] = useState<{name: string, amount: number}[]>([])
//Actions
  //  adding an asset
  const addAsset = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem('assetName') as HTMLInputElement).value
    const amount = parseFloat((form.elements.namedItem('assetAmount') as HTMLInputElement).value) || 0
    
    const newAsset = { name, amount }
    setAssets([...assets, newAsset])
    setNetWorth(prev => prev + amount)
    form.reset()
  }

  //  adding a liability
  const addLiability = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem('liabilityName') as HTMLInputElement).value
    const amount = parseFloat((form.elements.namedItem('liabilityAmount') as HTMLInputElement).value) || 0

    const newLiability = { name, amount }
    setLiabilities([...liabilities, newLiability])
    setNetWorth(prev => prev - amount)
    form.reset()
  }

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({ assets, liabilities, netWorth }),
      headers: { 'Content-Type': 'application/json' }
    })
    alert('Data saved to database!')
  }

  return (
    <div>
      <header className="navbar">
        <h1 className="logo">Summer Project.</h1>
        <nav>
          <a href="/login">Login</a>
          <a href="/signup" className="btn">SignUp</a>
        </nav>
      </header>

      <main className="container">
        <section className="hero">
          <h2>Summer Project</h2>
          <p>wealth asset tra   
