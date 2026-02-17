document.addEventListener('DOMContentLoaded', () => {
  const primaryButtons = document.querySelectorAll('.btn.primary')

  primaryButtons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-1px)'
    })

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)'
    })
  })
})

