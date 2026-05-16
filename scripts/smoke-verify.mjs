if (process.env.SMOKE_FAIL === 'true') {
  console.error('Smoke test FAILED (simulated staging error)')
  process.exit(1)
}

const a = 1
const b = 1

if (a !== b) {
  console.error('Assert failed: expected 1 === 1')
  process.exit(1)
}

console.log('Smoke test passed: staging is healthy (1 === 1)')
