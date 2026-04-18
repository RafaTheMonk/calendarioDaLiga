const MONTH_NAMES = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
];

const EVENT_LABELS = {
  presencial: 'Presencial',
  online:     'Online',
  happy:      'Happy Liga',
  highlight:  'Destaque',
  menta:      'Especial',
};

const MONTHS = [
  {
    label:        'Abril 2026',
    year:         2026,
    month:        3,
    startWeekday: 3,
    totalDays:    30,
    events: {
      15: [{ time: '18h',   name: 'Aulão da Liga',              type: 'online',    desc: 'Aulão online com toda a Liga. Prepare-se para uma tarde de muito aprendizado e networking!' }],
      16: [{ time: '14h',   name: 'Capacitação Marketing',      type: 'online',    desc: 'Sessão de capacitação focada em estratégias de marketing para o mercado atual.' }],
      17: [
        { time: '12h30', name: 'Marmeet',                     type: 'presencial', desc: 'Encontro informal para networking durante o almoço. Traga sua marmita!' },
        { time: '15h00', name: 'Evento Hub Salvador',          type: 'presencial', desc: 'Evento especial no Hub Salvador. Presença confirmada da equipe.' },
      ],
      18: [
        { time: '14h',   name: 'Apresentações Marketing',     type: 'presencial', desc: 'Apresentações das equipes com resultados e estratégias de marketing.' },
        { time: '14h',   name: 'Reunião Semanal',             type: 'presencial', desc: 'Reunião semanal de alinhamento com toda a equipe.' },
        { time: '20h',   name: 'Happy Liga Calourada Pitbull', type: 'happy',     desc: 'Noite de confraternização da Liga! Venha se divertir com a galera.' },
      ],
      20: [{ time: '14h',   name: 'Capacitação Tecnologia',     type: 'presencial', desc: 'Capacitação técnica sobre as tecnologias usadas pela Liga.' }],
      21: [{ time: '14h',   name: 'Apresentações Tecnologia',   type: 'online',    desc: 'Apresentações dos projetos tecnológicos desenvolvidos pelas equipes.' }],
      22: [{ time: '14h',   name: 'Liga Visita',                type: 'presencial', desc: 'Visita técnica organizada pela Liga a uma empresa parceira.' }],
      23: [{ time: '14h',   name: 'Capacitação Negócios + Comunidade', type: 'presencial', desc: 'Sessão dupla: capacitação em negócios e encontro com a comunidade.' }],
      24: [
        { time: '14h',   name: 'Apresentações Negócios + Comunidade', type: 'presencial', desc: 'Apresentações das equipes de negócios e projetos comunitários.' },
        { time: '15h30', name: 'Capacitação Gestão de Pessoas', type: 'presencial', desc: 'Capacitação sobre liderança e gestão de pessoas no ambiente de startup.' },
      ],
      25: [
        { time: '13h',   name: 'Apresentações Gestão de Pessoas', type: 'presencial', desc: 'Apresentações sobre gestão de pessoas e liderança.' },
        { time: '14h30', name: 'Reunião Semanal',              type: 'presencial', desc: 'Reunião semanal de alinhamento e feedbacks.' },
        { time: '19h',   name: 'Happy Liga com o Marketing',  type: 'happy',     desc: 'Happy Liga com o Marketing!' },
      ],
      27: [{ time: '14h',   name: 'Entrega de Case surpresa',   type: 'presencial', desc: 'Entrega e apresentação do case surpresa. Boa sorte a todos!' }],
    },
    spanEvents: [
      {
        startDay: 28, endDay: 30,
        time: '18h', name: 'Mentoria Especializada', type: 'online',
        desc: 'Mentoria especializada online com profissionais de mercado. Evento que ocupa vários dias, confira os horários com sua equipe.',
      },
    ],
  },
  {
    label:        'Maio 2026',
    year:         2026,
    month:        4,
    startWeekday: 5,
    totalDays:    31,
    events: {
      1: [{ time: '18h',   name: 'Mentoria Especializada (cont.)', type: 'online',    desc: 'Continuação da Mentoria Especializada online.' }],
      2: [
        { time: '14h',   name: 'Reunião Semanal',             type: 'presencial', desc: 'Reunião semanal de alinhamento.' },
        { time: '19h',   name: 'Happy Liga com a Donna',      type: 'happy',     desc: 'Happy Liga com a Donna!' },
      ],
      4: [{ time: '18h',   name: 'Mentoria Especializada',      type: 'online',    desc: 'Nova sessão de mentoria especializada online.' }],
      5: [{ time: '18h',   name: 'Mentoria Especializada',      type: 'online',    desc: 'Última sessão de mentoria especializada online.' }],
      6: [{ time: '14h',   name: 'Liga Visita Index',           type: 'presencial', desc: 'Visita ao Index — espaço de inovação.' }],
      7: [{ time: '18h',   name: 'Mentoria Especializada',      type: 'online',    desc: 'Sessão de mentoria especializada online.' }],
      8: [{ time: '14h',   name: 'Entrega CASE Surpresa',       type: 'presencial', desc: 'Entrega e apresentação do case surpresa da semana.' }],
      9: [{ time: '19h',   name: 'Happy Liga com o Business Boy', type: 'happy',   desc: 'Happy Liga especial com o Business Boy!' }],
    },
    spanEvents: [],
  },
];

// ─── STATE ────────────────────────────────────────
let currentMonthIdx = 0;
let activeFilter    = null;

// ─── HELPERS ──────────────────────────────────────
function isToday(year, month, day) {
  const now = new Date();
  return year === now.getFullYear() && month === now.getMonth() && day === now.getDate();
}

function labelFor(type) {
  return EVENT_LABELS[type] ?? type;
}

// ─── ELEMENT FACTORIES ────────────────────────────
function createEventEl(ev, day, monthData) {
  const el = document.createElement('div');
  el.className = `event ${ev.type}`;
  el.innerHTML = `<span class="event-time">${ev.time}</span>${ev.name}`;
  el.addEventListener('click', () => openModal(ev, day, monthData));
  return el;
}

function createDayCell(dayNum, cellIndex, data) {
  const cell = document.createElement('div');
  cell.className = 'day-cell';
  cell.style.animationDelay = `${cellIndex * 0.018}s`;

  const weekday = cellIndex % 7;
  if (weekday === 0) cell.classList.add('sunday');
  if (weekday === 6) cell.classList.add('saturday');
  if (isToday(data.year, data.month, dayNum)) cell.classList.add('today');

  const numEl = document.createElement('div');
  numEl.className = 'day-number';
  numEl.textContent = dayNum;
  cell.appendChild(numEl);

  (data.events[dayNum] ?? []).forEach(ev => cell.appendChild(createEventEl(ev, dayNum, data)));

  return cell;
}

function createEmptyCell() {
  const cell = document.createElement('div');
  cell.className = 'day-cell empty';
  return cell;
}

const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function isMobile() {
  return window.innerWidth <= 600;
}

// ─── SPAN EVENTS (grid) ───────────────────────────
function renderSpanEvents(data, grid) {
  data.spanEvents.forEach(se => {
    const startCell = grid.children[data.startWeekday + se.startDay - 1];
    if (!startCell) return;

    const overlay = document.createElement('div');
    overlay.className = 'span-event-overlay';
    overlay.textContent = `${se.time} ${se.name}`;
    overlay.title = `${se.name} — dias ${se.startDay} a ${se.endDay}`;
    overlay.addEventListener('click', () => openModal(se, se.startDay, data));
    startCell.appendChild(overlay);

    for (let d = se.startDay + 1; d <= se.endDay; d++) {
      const cell = grid.children[data.startWeekday + d - 1];
      if (!cell) continue;
      const tail = document.createElement('div');
      tail.className = 'span-event-tail';
      cell.appendChild(tail);
    }
  });
}

// ─── GRID VIEW ────────────────────────────────────
function renderGrid(data, container) {
  container.className = 'calendar-grid';

  const totalSlots = Math.ceil((data.startWeekday + data.totalDays) / 7) * 7;
  for (let i = 0; i < totalSlots; i++) {
    const dayNum = i - data.startWeekday + 1;
    const isValid = dayNum >= 1 && dayNum <= data.totalDays;
    container.appendChild(isValid ? createDayCell(dayNum, i, data) : createEmptyCell());
  }

  renderSpanEvents(data, container);
}

// ─── AGENDA VIEW (mobile) ─────────────────────────
function renderAgenda(data, container) {
  container.className = 'agenda-view';

  const daysWithEvents = new Set([
    ...Object.keys(data.events).map(Number),
    ...data.spanEvents.map(se => se.startDay),
  ]);

  [...daysWithEvents].sort((a, b) => a - b).forEach(dayNum => {
    const weekday = (data.startWeekday + dayNum - 1) % 7;
    const today   = isToday(data.year, data.month, dayNum);

    const dayEl = document.createElement('div');
    dayEl.className = `agenda-day${today ? ' today' : ''}`;

    const dateEl = document.createElement('div');
    dateEl.className = 'agenda-date';
    dateEl.innerHTML =
      `<span class="agenda-day-num">${dayNum}</span>` +
      `<span class="agenda-day-name">${DAY_NAMES[weekday]}</span>`;

    const eventsEl = document.createElement('div');
    eventsEl.className = 'agenda-events';

    (data.events[dayNum] ?? []).forEach(ev =>
      eventsEl.appendChild(createEventEl(ev, dayNum, data))
    );

    data.spanEvents.filter(se => se.startDay === dayNum).forEach(se =>
      eventsEl.appendChild(createEventEl(se, dayNum, data))
    );

    dayEl.appendChild(dateEl);
    dayEl.appendChild(eventsEl);
    container.appendChild(dayEl);
  });
}

// ─── RENDER ───────────────────────────────────────
function renderCalendar() {
  const data      = MONTHS[currentMonthIdx];
  const container = document.getElementById('calendarGrid');
  container.innerHTML = '';
  activeFilter = null;
  document.querySelectorAll('.legend-item').forEach(el => {
    el.classList.remove('active', 'dimmed');
  });

  document.querySelector('.title').innerHTML =
    `Calendário de <span>Ativações</span><br>` +
    `<small style="font-size:0.45em;letter-spacing:3px;color:var(--text-muted)">${data.label}</small>`;

  document.querySelector('.weekdays').style.display = isMobile() ? 'none' : '';

  isMobile() ? renderAgenda(data, container) : renderGrid(data, container);
}

// ─── MODAL ────────────────────────────────────────
function openModal(ev, day, data) {
  document.getElementById('modalTag').textContent  = labelFor(ev.type);
  document.getElementById('modalTag').className    = `modal-tag ${ev.type}`;
  document.getElementById('modalTitle').textContent = ev.name;
  document.getElementById('modalDate').textContent  = `${day} de ${MONTH_NAMES[data.month]}, ${data.year}`;
  document.getElementById('modalTime').textContent  = ev.time ? `🕐 ${ev.time}` : '';
  document.getElementById('modalDesc').textContent  = ev.desc ?? '';
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ─── NAVIGATION ───────────────────────────────────
document.getElementById('prevMonth').addEventListener('click', () => {
  if (currentMonthIdx > 0) { currentMonthIdx--; renderCalendar(); }
});
document.getElementById('nextMonth').addEventListener('click', () => {
  if (currentMonthIdx < MONTHS.length - 1) { currentMonthIdx++; renderCalendar(); }
});

// ─── FILTER ───────────────────────────────────────

function applyFilter(type) {
  const grid = document.getElementById('calendarGrid');
  activeFilter = activeFilter === type ? null : type;

  grid.classList.toggle('filter-active', activeFilter !== null);

  document.querySelectorAll('.event').forEach(el => {
    const matches = !activeFilter || el.classList.contains(activeFilter);
    el.style.opacity = matches ? '1' : '0.1';
    el.style.pointerEvents = matches ? '' : 'none';
  });

  document.querySelectorAll('.legend-item').forEach(el => {
    el.classList.toggle('active',  el.dataset.type === activeFilter);
    el.classList.toggle('dimmed', activeFilter !== null && el.dataset.type !== activeFilter);
  });
}

document.querySelectorAll('.legend-item').forEach(el => {
  el.addEventListener('click', () => applyFilter(el.dataset.type));
});

// ─── RESIZE ───────────────────────────────────────
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(renderCalendar, 200);
});

// ─── INIT ─────────────────────────────────────────
renderCalendar();
