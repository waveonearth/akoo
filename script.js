// 다크모드 토글
const darkToggle = document.getElementById('darkmode-switch');
darkToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark', darkToggle.checked);
    localStorage.setItem('darkMode', darkToggle.checked ? 'on' : 'off');
});

// 페이지 로드시 다크모드 상태 복원
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'on') {
        document.body.classList.add('dark');
        darkToggle.checked = true;
    }
});

// 아코디언 메뉴
document.querySelectorAll('.toggle-header').forEach(header => {
    header.addEventListener('click', () => {
        const submenu = header.nextElementSibling;
        submenu.classList.toggle('open');
    });
});

// 스크롤 탑 버튼
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.style.display = (mobileMenu.style.display === 'flex') ? 'none' : 'flex';
});