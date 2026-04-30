export default function Hero({ onRandom }) {
  return (
    <section className="hero">
      <span className="hero-emoji">🍸</span>
      <h1>调酒配方</h1>
      <p>探索经典与创意鸡尾酒配方，找到属于你的那杯</p>
      <div style={{ marginTop: '20px' }}>
        <button className="btn btn-primary" onClick={onRandom}>
          🎲 随机一杯
        </button>
      </div>
    </section>
  )
}
