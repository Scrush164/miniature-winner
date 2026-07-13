"use client"
import { useState } from 'react'

export default function Home() {
  const [netWorth, setNetWorth] = useState(0)
  const [assets, setAssets] = useState<{name: string, amount: number}[]>([])
  const [liabilities, setLiabilities] = useState<{name: string, amount: number}[]>([])

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
          <p>wealth asset tracker</p>
        </section>

        <section className="calculator">
          <div className="net-worth-display">
            <div className="net-worth-label">Your Net Worth</div>
            <div className="net-worth-value">${netWorth.toFixed(2)}</div>
          </div>

          <h3>Enter Assets</h3>
          <form onSubmit={addAsset}>
            <div className="field">
              <label>Name</label>
              <input type="text" name="assetName" placeholder="e.g. Savings" required />
            </div>
            <div className="field">
              <label>Amount</label>
              <input type="number" name="assetAmount" placeholder="0" required />
              <button type="submit" className="add-btn">Add Asset</button>
            </div>
          </form>

          <h3>Enter Liabilities</h3>
          <form onSubmit={addLiability}>
            <div className="field">
              <label>Name</label>
              <input type="text" name="liabilityName" placeholder="e.g. Loan" required />
            </div>
            <div className="field">
              <label>Amount</label>
              <input type="number" name="liabilityAmount" placeholder="0" required />
              <button type="submit" className="add-btn">Add Liability</button>
            </div>
          </form>

          <button onClick={handleSubmit} className="btn-primary">Save Total to Database</button>
        </section>
      </main>
      <footer>all rights reserved.</footer>
    </div>
  )
}
