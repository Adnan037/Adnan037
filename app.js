(() => {
  function init() {
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => [...document.querySelectorAll(selector)];
    const email = 'adnanzkhan180@gmail.com';
    let toastTimer;

    function showToast(message) {
      const toast = $('#toast');
      clearTimeout(toastTimer);
      toast.querySelector('span').textContent = message;
      toast.hidden = false;
      toastTimer = setTimeout(() => { toast.hidden = true; }, 4500);
    }

    $('#year').textContent = new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'Asia/Dubai' }).format(new Date());

    const menuButton = $('.menu-toggle');
    const mobileNav = $('#mobile-nav');
    const setMenu = (open) => {
      mobileNav.hidden = !open;
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menuButton.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
    };
    menuButton.addEventListener('click', () => setMenu(mobileNav.hidden));
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobileNav.hidden) { setMenu(false); menuButton.focus(); }
    });
    window.matchMedia('(min-width: 651px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

    const navLinks = $$('.desktop-nav a');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            navLinks.forEach(link => {
              const active = link.getAttribute('href') === '#' + entry.target.id;
              link.classList.toggle('active', active);
              if (active) link.setAttribute('aria-current', 'location');
              else link.removeAttribute('aria-current');
            });
          }
        }
      }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
      $$('main section[id]').forEach(section => observer.observe(section));
    }

    const projects = $$('.project-card');
    $$('.filter').forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        $$('.filter').forEach(item => {
          const active = item === button;
          item.classList.toggle('active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        let visible = 0;
        projects.forEach(project => {
          project.hidden = filter !== 'all' && project.dataset.category !== filter;
          if (!project.hidden) visible++;
        });
        const filterNames = { it: 'IT & operations', business: 'business websites', ai: 'AI & automation' };
        $('#filter-status').textContent = `Showing ${visible} ${visible === 1 ? 'project' : 'projects'}${filter === 'all' ? '.' : ` in ${filterNames[filter]}.`}`;
      });
    });

    $$('.experience-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(open));
        document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
      });
    });

    const projectDetails = {
      unified: {
        category: 'IT OPERATIONS / BUSINESS PLATFORM',
        title: 'Unified IT Ops',
        status: 'Live · access restricted',
        intro: 'A private IT operations workspace for Office Connect. The live site requires company sign-in.',
        sections: [
          { title: 'What it does today', text: 'Brings system inventory, device reporting, equipment, software accounts, and connection setup into one workspace. Native desktop agents and an Android inventory app report device hardware and usage to authorized company accounts.' },
          { title: 'Access and integration', text: 'The Cloudflare-hosted site is restricted to authorized company users. Vendor data synchronization depends on a separately configured and verified API connector; opening an admin sign-in page alone is not a connection.' },
          { title: 'Windows desktop controls', text: 'Released agent version 0.5.8 includes a dedicated native Windows tray app, desktop and notification-area controls, last-reported device readings, installed antivirus status, and local Microsoft Defender quick-scan and signature-update actions. These controls use an installed protection engine; they do not represent a standalone antivirus or EDR product.' },
          { title: 'Installation and updates', text: 'Desktop agents support automatic release updates. Windows release 0.5.8 restores missing uninstall files and Programs and Features registration, provides an in-app uninstall action with administrator approval, and preserves existing enrollment during installer repairs. Uninstalling the local agent leaves company inventory records separate.' },
          { title: 'Current stage', text: 'This is an active project. The dashboard graphic in this portfolio is an illustration. Android inventory reporting is available for enrolled devices. macOS/Linux have optional ClamAV command support; matching security interfaces, Android antivirus, iOS support, and full AV/EDR remain unfinished.' }
        ],
        url: 'https://unified-it-ops.ak6335186.workers.dev/',
        linkLabel: 'Visit company sign-in'
      },
      fragrances: {
        category: 'BUSINESS WEBSITE / STOREFRONT',
        title: 'ALSAAD FRAGRANCES',
        status: 'Live website',
        intro: 'A fragrance brand website hosted on Cloudflare Pages, with product discovery and a shopping experience in progress.',
        sections: [
          { title: 'What visitors can use', text: 'Browse the product galleries, save favourites, use the shopping bag, and open a WhatsApp enquiry.' },
          { title: 'Commerce status', text: 'Online payment and order email delivery are not active yet; their backend requires merchant and service configuration. The site does not claim completed live checkout.' },
          { title: 'Source and hosting', text: 'The storefront is deployed from a private GitHub repository to Cloudflare Pages. The live site is public.' }
        ],
        url: 'https://alsaad-fragrances.pages.dev/',
        linkLabel: 'Visit live website'
      },
      assistant: {
        category: 'AI ASSISTANTS / PROJECT DIRECTION',
        title: 'AI Support Assistant',
        status: 'Concept exploration',
        intro: 'A project direction that brings my background in technical support together with my interest in AI assistant engineering.',
        sections: [
          { title: 'The question I’m exploring', text: 'How could an assistant help people find clear answers to common IT questions, understand the next troubleshooting step, and give an engineer useful context when human support is needed?' },
          { title: 'Ideas for the project', items: ['A conversational interface for common support questions.', 'Guidance grounded in a business’s own support knowledge.', 'A clear handover to a support engineer when an issue needs investigation.'] },
          { title: 'Current stage', text: 'This is a concept for my developing AI portfolio. The interface in the project card is an illustration, and a working assistant is not linked yet.' }
        ]
      },
      analytics: {
        category: 'AI ANALYTICS / PROJECT DIRECTION',
        title: 'Business Intelligence with AI',
        status: 'Concept exploration',
        intro: 'An area I’m exploring alongside my business platforms: helping teams ask better questions of operational data.',
        sections: [
          { title: 'The opportunity', text: 'IT operations involve reports, inventories, service information, and recurring questions. I’m interested in how AI could help make that information easier to understand.' },
          { title: 'Ideas for the project', items: ['Ask questions about business and IT operations in everyday language.', 'Summarize information with a clear link back to its source.', 'Present useful trends and follow-up questions in a simple dashboard.'] },
          { title: 'Current stage', text: 'This is a concept for future project work. The chart in the showcase is a design illustration and does not represent live business data.' }
        ]
      }
    };

    const dialog = $('#project-dialog');
    let dialogTrigger;
    $$('[data-project]').forEach(button => {
      button.addEventListener('click', () => {
        const project = projectDetails[button.dataset.project];
        dialogTrigger = button;
        $('#dialog-category').textContent = project.category;
        $('#dialog-title').textContent = project.title;
        $('#dialog-status').textContent = project.status;
        $('#dialog-status').classList.toggle('live', Boolean(project.url));
        $('#dialog-intro').textContent = project.intro;
        const content = $('#dialog-content');
        content.replaceChildren();
        project.sections.forEach(section => {
          const block = document.createElement('section');
          block.className = 'dialog-section';
          const title = document.createElement('h3');
          title.textContent = section.title;
          block.append(title);
          if (section.text) {
            const paragraph = document.createElement('p');
            paragraph.textContent = section.text;
            block.append(paragraph);
          }
          if (section.items) {
            const list = document.createElement('ul');
            section.items.forEach(item => {
              const li = document.createElement('li');
              li.textContent = item;
              list.append(li);
            });
            block.append(list);
          }
          content.append(block);
        });
        const links = $('#dialog-links');
        links.replaceChildren();
        if (project.url) {
          const link = document.createElement('a');
          link.className = 'button button-primary';
          link.href = project.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = project.linkLabel + ' ↗';
          links.append(link);
        }
        const contact = document.createElement('a');
        contact.className = 'text-link';
        contact.href = '#contact';
        contact.textContent = 'Talk about a project →';
        contact.addEventListener('click', () => dialog.close());
        links.append(contact);
        dialog.showModal();
        document.body.classList.add('dialog-open');
      });
    });
    $('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      dialogTrigger?.focus({ preventScroll: true });
    });

    $('#copy-email').addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = email;
          textarea.style.cssText = 'position:fixed;left:-9999px;top:0';
          document.body.append(textarea);
          textarea.select();
          const copied = document.execCommand('copy');
          textarea.remove();
          $('#copy-email').focus({ preventScroll: true });
          if (!copied) throw new Error('Copy unavailable');
        }
        showToast('Email address copied');
      } catch {
        showToast('Select the email address above to copy it.');
      }
    });

    $('#contact-form').addEventListener('submit', event => {
      event.preventDefault();
      const name = $('#contact-name').value.trim();
      const message = $('#contact-message').value.trim();
      if (!name || !message) {
        showToast('Please add your name and a message.');
        (!name ? $('#contact-name') : $('#contact-message')).focus();
        return;
      }
      const topic = $('#contact-topic').value;
      const subject = `${topic} — ${name}`;
      const body = `Hi Adnan,\n\n${message}\n\nBest regards,\n${name}`;
      const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = $('#form-status');
      status.replaceChildren(document.createTextNode('Your draft is ready. If your email app didn’t open, '));
      const link = document.createElement('a');
      link.href = mailto;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'open the draft here';
      status.append(link, document.createTextNode('.'));
      status.hidden = false;
      link.click();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
