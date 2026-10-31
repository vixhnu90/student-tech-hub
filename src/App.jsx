import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  BriefcaseBusiness,
  BrainCircuit,
  Check,
  CheckCircle2,
  Cloud,
  Download,
  ExternalLink,
  Flame,
  Folder,
  GitBranch,
  Globe,
  Lightbulb,
  Link,
  Lock,
  Play,
  Route,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Upload,
  UserCircle,
  X,
  Zap,
} from "lucide-react";

import "./App.css";

const PROJECTS = {
  "AI / Machine Learning": {
    category: "AI / Machine Learning",
    title: "Smart Campus Waste Classifier",
    description:
      "Build an AI model that classifies campus waste into categories such as recyclable, organic, and general waste.",
    difficulty: "Intermediate",
    duration: "3–4 weeks",
    skills: ["Python", "Machine Learning", "Computer Vision"],
    icon: BrainCircuit,
  },

  "Web Development": {
    category: "Web Development",
    title: "Student Skill Exchange Hub",
    description:
      "Create a web platform where students can exchange skills, find learning partners, and collaborate on projects.",
    difficulty: "Intermediate",
    duration: "2–3 weeks",
    skills: ["React", "JavaScript", "CSS"],
    icon: Globe,
  },

  "Mobile Development": {
    category: "Mobile Development",
    title: "Campus Bicycle Sharing Tracker",
    description:
      "Build a mobile application that helps students find, reserve, and track shared bicycles around campus.",
    difficulty: "Intermediate",
    duration: "3–4 weeks",
    skills: ["React Native", "Mobile UI", "Firebase"],
    icon: Smartphone,
  },

  "IoT & Embedded": {
    category: "IoT & Embedded",
    title: "Smart Classroom Energy Monitor",
    description:
      "Create an IoT system that monitors classroom electricity usage and provides alerts when energy consumption is unusually high.",
    difficulty: "Intermediate",
    duration: "3–4 weeks",
    skills: ["ESP32", "Sensors", "IoT"],
    icon: Zap,
  },

  Cybersecurity: {
    category: "Cybersecurity",
    title: "Student Phishing Awareness Simulator",
    description:
      "Develop a safe educational simulator that teaches students how to recognize common phishing techniques.",
    difficulty: "Intermediate",
    duration: "2–3 weeks",
    skills: ["Cybersecurity", "Web", "Security Awareness"],
    icon: ShieldCheck,
  },

  "Data Science": {
    category: "Data Science",
    title: "Campus Placement Insights",
    description:
      "Analyze placement data to discover trends in skills, packages, companies, and student performance.",
    difficulty: "Beginner",
    duration: "2–3 weeks",
    skills: ["Python", "Pandas", "Power BI"],
    icon: BarChart3,
  },

  "Cloud / DevOps": {
    category: "Cloud / DevOps",
    title: "Student CI/CD Deployment Hub",
    description:
      "Build a simple deployment platform that demonstrates automated testing, version control, and cloud deployment.",
    difficulty: "Intermediate",
    duration: "2–3 weeks",
    skills: ["Git", "CI/CD", "Cloud"],
    icon: Cloud,
  },
};

const ROADMAP_STEPS = [
  {
    number: "01",
    title: "Project Environment & Setup",
    description:
      "Set up your development environment, repository, project structure, and required dependencies.",
  },
  {
    number: "02",
    title: "Data & Resource Preparation",
    description:
      "Collect the required resources and organize the data, assets, or information needed for your project.",
  },
  {
    number: "03",
    title: "Core Development",
    description:
      "Build the main functionality and implement the core architecture of your project.",
  },
  {
    number: "04",
    title: "Testing & Evaluation",
    description:
      "Test the project, identify problems, improve performance, and validate the expected output.",
  },
  {
    number: "05",
    title: "Backend / API Integration",
    description:
      "Connect your frontend with APIs, services, databases, or backend functionality.",
  },
  {
    number: "06",
    title: "User Interface & Integration",
    description:
      "Connect all components and polish the user experience across desktop and mobile devices.",
  },
  {
    number: "07",
    title: "Deployment & Portfolio Showcase",
    description:
      "Deploy the project and prepare documentation so you can showcase it in your portfolio.",
  },
];

function createRoadmapSteps(project) {
  const primarySkill = project.skills[0] || project.category;
  const secondarySkill = project.skills[1] || project.category;

  return ROADMAP_STEPS.map((step, index) => {
    const projectSpecificSteps = {
      1: {
        title: `${project.category} Resource Preparation`,
        description: `Gather the datasets, content, or resources needed for ${project.title}.`,
      },
      2: {
        title: `Build ${project.title}`,
        description: `Develop the core features of ${project.title} using ${primarySkill}.`,
      },
      3: {
        title: `${secondarySkill} Integration & Testing`,
        description: `Integrate ${secondarySkill}, test the project, and validate its expected results.`,
      },
    };
    const details = projectSpecificSteps[index];

    return {
      ...step,
      ...(details || {}),
      status: index === 0 ? "active" : "locked",
      proof: null,
    };
  });
}

function readSavedUser() {
  try {
    const user = JSON.parse(
      window.localStorage.getItem("student-tech-hub-user") || "null"
    );
    return user && typeof user.name === "string" ? user : null;
  } catch {
    return null;
  }
}

function readSavedStreak() {
  try {
    const streak = JSON.parse(
      window.localStorage.getItem("student-tech-hub-streak") || "null"
    );
    return streak && Number.isInteger(streak.count) ? streak : { count: 0, lastActive: "" };
  } catch {
    return { count: 0, lastActive: "" };
  }
}

function getGreeting(hour = new Date().getHours()) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function pdfSafeText(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "?")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function createProjectReportPdf(project, links, projectCompleted) {
  const contentLines = [
    "STUDENT TECH HUB - PROJECT REPORT",
    "",
    `Project: ${project.title}`,
    `Status: ${projectCompleted ? "Completed" : "In Progress"}`,
    `Difficulty: ${project.difficulty}`,
    `Duration: ${project.duration}`,
    "",
    "Description:",
    project.description,
    "",
    `Skills: ${project.skills.join(", ")}`,
    `GitHub repository: ${links.github || "Not provided"}`,
    `Live demo: ${links.demo || "Not provided"}`,
  ];
  const commands = ["BT", "/F1 12 Tf", "50 790 Td", "16 TL"];

  const wrappedLines = contentLines.flatMap((line) => {
    const words = line.split(/\s+/);
    const result = [];
    let currentLine = "";

    words.forEach((word) => {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (candidate.length > 78 && currentLine) {
        result.push(currentLine);
        currentLine = "";
        for (let index = 0; index < word.length; index += 78) {
          const chunk = word.slice(index, index + 78);
          if (index + 78 < word.length) {
            result.push(chunk);
          } else {
            currentLine = chunk;
          }
        }
      } else {
        currentLine = candidate;
      }
    });

    result.push(currentLine);
    return result;
  });

  wrappedLines.forEach((line, index) => {
    if (index > 0) {
      commands.push("T*");
    }
    commands.push(`(${pdfSafeText(line)}) Tj`);
  });
  commands.push("ET");

  const stream = commands.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

function getValidWebUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.href
      : "";
  } catch {
    return "";
  }
}

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(readSavedUser);
  const [streak, setStreak] = useState(readSavedStreak);

  const [selectedProject, setSelectedProject] = useState(
    PROJECTS["AI / Machine Learning"]
  );
  const [roadmapSteps, setRoadmapSteps] = useState(() =>
    createRoadmapSteps(PROJECTS["AI / Machine Learning"])
  );
  const [projectLinks, setProjectLinks] = useState({});

  const selectProject = (project) => {
    setSelectedProject(project);
    setRoadmapSteps(createRoadmapSteps(project));
  };

  const recordActiveDay = () => {
    const todayDate = new Date();
    const today = getLocalDateKey(todayDate);
    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = getLocalDateKey(yesterdayDate);
    const nextStreak = {
      count:
        streak.lastActive === today
          ? streak.count
          : streak.lastActive === yesterday
            ? streak.count + 1
            : 1,
      lastActive: today,
    };

    setStreak(nextStreak);
    window.localStorage.setItem(
      "student-tech-hub-streak",
      JSON.stringify(nextStreak)
    );
  };

  const handleDemoSignIn = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextUser = {
      name: String(formData.get("name")).trim(),
      email: String(formData.get("email")).trim(),
    };

    setUser(nextUser);
    window.localStorage.setItem(
      "student-tech-hub-user",
      JSON.stringify(nextUser)
    );
    recordActiveDay();
    navigate("dashboard");
  };

  const submitStepProof = (stepNumber, file) => {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    setRoadmapSteps((steps) =>
      steps.map((step) =>
        step.number === stepNumber
          ? {
              ...step,
              proof: {
                name: file.name,
                previewUrl: URL.createObjectURL(file),
                submittedAt: new Date().toISOString(),
              },
            }
          : step
      )
    );
  };

  const projectCompleted = roadmapSteps.every(
    (step) => step.status === "done"
  );
  const updateProjectLink = (projectTitle, field, value) => {
    setProjectLinks((links) => ({
      ...links,
      [projectTitle]: {
        ...links[projectTitle],
        [field]: value,
      },
    }));
  };

  const navigate = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      {page !== "home" && <Header page={page} navigate={navigate} />}

      <main>
        {page === "home" && (
          <Home
            navigate={navigate}
            project={selectedProject}
            steps={roadmapSteps}
            user={user}
            onSignIn={handleDemoSignIn}
          />
        )}

        {page === "dashboard" && (
          <Dashboard
            navigate={navigate}
            project={selectedProject}
            steps={roadmapSteps}
            user={user}
            streak={streak.count}
          />
        )}

        {page === "assistant" && (
          <Assistant
            project={selectedProject}
            setProject={selectProject}
            navigate={navigate}
          />
        )}

        {page === "roadmap" && (
          <Roadmap
            project={selectedProject}
            navigate={navigate}
            steps={roadmapSteps}
            submitStepProof={submitStepProof}
          />
        )}

        {page === "portfolio" && (
          <Portfolio
            project={selectedProject}
            navigate={navigate}
            projectCompleted={projectCompleted}
            links={projectLinks[selectedProject.title] || {}}
            updateProjectLink={updateProjectLink}
          />
        )}

        {page === "profile" && <Profile navigate={navigate} />}
      </main>

      <BottomNavigation page={page} navigate={navigate} />
    </div>
  );
}

/* =========================
   HEADER
========================= */

function Header({ page, navigate }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "dashboard", label: "Dashboard" },
    { id: "assistant", label: "AI Assistant" },
    { id: "roadmap", label: "Roadmap" },
    { id: "portfolio", label: "Portfolio" },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <button
          className="brand"
          onClick={() => navigate("home")}
          aria-label="Student Tech Hub home"
        >
          <div className="brand-mark">
            <img
              className="brand-logo"
              src={`${import.meta.env.BASE_URL}student-tech-hub-logo.png`}
              alt=""
            />
          </div>

          <div className="brand-text">
            <strong>Student Tech Hub</strong>
            <span>Build. Learn. Showcase.</span>
          </div>
        </button>

        <nav className="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${
                page === item.id ? "active" : ""
              }`}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-button"
            aria-label="Notifications"
            onClick={() => alert("You have 3 new notifications.")}
          >
            <Bell size={19} />
            <span className="notification-dot" />
          </button>

          <button
            className="avatar-button"
            onClick={() => navigate("profile")}
            aria-label="Open profile"
          >
            <UserCircle size={31} />
          </button>

        </div>
      </div>
    </header>
  );
}

/* =========================
   HOME
========================= */

function Home({ navigate, project, steps, user, onSignIn }) {
  const [signInOpen, setSignInOpen] = useState(false);
  const completedSteps = steps.filter(
    (step) => step.status === "done"
  ).length;
  const progress = Math.round((completedSteps / steps.length) * 100);
  const startBuilding = () => setSignInOpen(true);

  return (
    <>
      <section className="hero page-section">
        <div className="hero-content">
          <div className="eyebrow">
            <Sparkles size={15} />
            YOUR PERSONAL TECH JOURNEY
          </div>

          <h1>
            Turn your ideas into
            <span> real projects.</span>
          </h1>

          <p className="hero-description">
            Student Tech Hub helps you discover project ideas,
            follow a clear roadmap, learn the right skills, and
            build a portfolio that actually stands out.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button hero-start-button"
              onClick={startBuilding}
            >
              Start Building
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-avatars">
              <span>AS</span>
              <span>RK</span>
              <span>VP</span>
              <span>+</span>
            </div>

            <div>
              <strong>Built for students</strong>
              <small>
                Learn by building practical projects.
              </small>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="dashboard-window">
            <div className="window-top">
              <div className="window-dots">
                <span />
                <span />
                <span />
              </div>

              <span className="window-title">
                student-tech-hub
              </span>

              <GitBranch size={16} />
            </div>

            <div className="window-body">
              <div className="build-pulse" aria-hidden="true">
                <span />
                <span />
                <span />
                <strong>BUILD IN PROGRESS</strong>
              </div>
              <div className="code-line short" />
              <div className="code-line long" />
              <div className="code-line medium" />

              <div className="code-card">
                <div className="code-card-title progress-title">
                  <CheckCircle2 size={17} />
                  <span>Progressing project</span>
                  <i aria-hidden="true" />
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="progress-info">
                  <span>{progress}% verified</span>
                  <span>
                    Step {Math.min(completedSteps + 1, steps.length)} of{" "}
                    {steps.length}
                  </span>
                </div>
              </div>

              <div className="code-line medium" />
              <div className="code-line short" />
            </div>
          </div>

          <div className="floating-card floating-card-one">
            <span className="floating-pulse-dot" />
            <div>
              <strong>Project is progressing</strong>
              <span>One verified step at a time</span>
            </div>
          </div>

          <div className="floating-card floating-card-two">
            <Lightbulb size={18} />
            <div>
              <strong>AI suggestion</strong>
              <span>Try adding model evaluation</span>
            </div>
          </div>
        </div>
      </section>

      <Architecture />

      <section className="why-section page-section">
        <div className="section-heading centered">
          <div className="eyebrow">
            <Target size={15} />
            WHY STUDENT TECH HUB?
          </div>

          <h2>Everything you need to build with confidence.</h2>

          <p>
            Stop jumping between random tutorials. Follow one
            connected workflow from idea to portfolio.
          </p>
        </div>

        <div className="feature-grid">
          <FeatureCard
            icon={<Bot size={22} strokeWidth={2.2} />}
            tone="guidance"
            title="AI Project Guidance"
            text="Get one focused project idea based on the domain you want to learn."
          />

          <FeatureCard
            icon={<Route size={22} strokeWidth={2.2} />}
            tone="roadmaps"
            title="Clear Roadmaps"
            text="Know exactly what to learn and build at every stage."
          />

          <FeatureCard
            icon={<BriefcaseBusiness size={22} strokeWidth={2.2} />}
            tone="portfolio"
            title="Portfolio Ready"
            text="Turn completed projects into strong portfolio pieces."
          />
        </div>
      </section>

      <section className="build-section page-section">
        <div className="build-copy">
          <div className="eyebrow">
            <Flame size={15} />
            BUILD YOUR WAY
          </div>

          <h2>
            From your first idea to your final showcase.
          </h2>

          <p>
            Student Tech Hub keeps your learning journey
            organized so you can spend less time wondering what
            to do next and more time actually building.
          </p>

          <button
            className="text-button"
            onClick={() => navigate("roadmap")}
          >
            View a sample roadmap
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="preview-card">
          <div className="preview-top">
            <div>
              <small>EXAMPLE PROJECT</small>
              <h3>{project.title}</h3>
            </div>

            <span className="status-pill">In Progress</span>
          </div>

          <div className="preview-progress">
            <div className="preview-progress-label">
              <span>Overall progress</span>
              <strong>{progress}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="preview-steps">
            {steps.slice(0, 4).map((step) => (
              <PreviewStep
                key={step.number}
                number={step.number}
                text={step.title}
                done={step.status === "done"}
                active={step.status === "active"}
              />
            ))}
          </div>
          <span className="example-caption">
            Example project for {project.category}
          </span>
        </div>
      </section>

      <section className="footer-cta page-section">
        <div>
          <span className="eyebrow">READY WHEN YOU ARE</span>
          <h2>Turn your next idea into a real project.</h2>
        </div>
        <button
          className="primary-button hero-start-button"
          onClick={startBuilding}
        >
          Start Building
          <ArrowRight size={18} />
        </button>
      </section>

      <Footer />

      {signInOpen && (
        <div
          className="sign-in-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSignInOpen(false);
            }
          }}
        >
          <form
            id="home-sign-in"
            className="home-sign-in"
            onSubmit={onSignIn}
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-sign-in-title"
          >
            <button
              className="sign-in-close"
              type="button"
              onClick={() => setSignInOpen(false)}
              aria-label="Close sign-in form"
            >
              <X size={19} />
            </button>
            <span
              id="home-sign-in-title"
              className="home-sign-in-title"
            >
              Let’s get you started
            </span>
            <p className="home-sign-in-description">
              Enter your details to continue to your dashboard.
            </p>
            <div className="home-sign-in-fields">
              <label>
                <span>Your name</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  defaultValue={user?.name || ""}
                  placeholder="Enter your name"
                  autoFocus
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={user?.email || ""}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter a demo password"
                  required
                />
              </label>
            </div>
            <button
              className="primary-button hero-start-button"
              type="submit"
            >
              Continue to Dashboard
              <ArrowRight size={18} />
            </button>
            <small>
              Demo sign-in only. Your password is not saved or sent.
            </small>
          </form>
        </div>
      )}
    </>
  );
}

/* =========================
   ARCHITECTURE
========================= */

function Architecture() {
  const steps = [
    {
      number: "01",
      title: "Choose",
      text: "Pick your domain and get a focused project idea.",
      icon: <Target size={21} />,
    },
    {
      number: "02",
      title: "Build",
      text: "Follow a step-by-step roadmap to develop it.",
      icon: <GitBranch size={21} />,
    },
    {
      number: "03",
      title: "Showcase",
      text: "Document your work and add it to your portfolio.",
      icon: <Folder size={21} />,
    },
  ];

  return (
    <section className="architecture page-section">
      <div className="section-heading">
        <div className="eyebrow">
          <GitBranch size={15} />
          HOW IT WORKS
        </div>

        <h2>A simple path from learning to building.</h2>
      </div>

      <div className="architecture-grid">
        {steps.map((step) => (
          <ArchitectureStep
            key={step.number}
            {...step}
          />
        ))}
      </div>
    </section>
  );
}

function ArchitectureStep({
  number,
  title,
  text,
  icon,
}) {
  return (
    <div className="architecture-step">
      <div className="architecture-number">{number}</div>

      <div className="architecture-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

/* =========================
   DASHBOARD
========================= */

function Dashboard({ navigate, project, steps, user, streak }) {
  const completedSteps = steps.filter(
    (step) => step.status === "done"
  ).length;
  const learningProgress = Math.round(
    (completedSteps / steps.length) * 100
  );
  const currentStep = steps.find((step) => step.status === "active");
  const latestProof = [...steps]
    .filter((step) => step.proof)
    .sort(
      (first, second) =>
        new Date(second.proof.submittedAt) -
        new Date(first.proof.submittedAt)
    )[0];

  return (
    <div className="page-container dashboard-page">
      <div className="dashboard-heading">
        <div>
          <div className="eyebrow">
            <Sparkles size={15} />
            YOUR DASHBOARD
          </div>

          <h1>
            {getGreeting()}, {user?.name || "builder"}.
          </h1>

          <p>
            {currentStep
              ? `Keep moving forward. Your next step is ${currentStep.title}.`
              : "Your project roadmap is complete. Great work."}
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("assistant")}
        >
          New Project
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={<Flame size={20} />}
          tone="streak"
          value={streak}
          label="Day streak"
          note={streak === 1 ? "Active today" : "Consecutive active days"}
        />

        <StatCard
          icon={<CheckCircle2 size={20} />}
          tone="tasks"
          value={completedSteps}
          label="Tasks completed"
          note="Roadmap steps approved"
        />

        <StatCard
          icon={<Folder size={20} />}
          tone="projects"
          value={project ? "01" : "00"}
          label="Projects"
          note={project ? "1 active project" : "No active projects"}
        />

        <StatCard
          icon={<Target size={20} />}
          tone="progress"
          value={`${learningProgress}%`}
          label="Learning progress"
          note={`${completedSteps} of ${steps.length} steps approved`}
        />
      </div>

      <div className="dashboard-layout">
        <section className="dashboard-project card">
          <div className="card-header">
            <div>
              <span className="card-label">ACTIVE PROJECT</span>
              <h2>{project.title}</h2>
            </div>

            <span className="status-pill">In Progress</span>
          </div>

          <p className="card-description">
            {project.description}
          </p>

          <div className="project-meta">
            <span className="project-meta-icon">
              <ProjectIcon icon={project.icon} size={20} />
            </span>
            <span>{project.difficulty}</span>
            <span>•</span>
            <span>{project.duration}</span>
          </div>

          <div className="project-progress">
            <div>
              <span>Verified project progress</span>
              <strong>{learningProgress}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${learningProgress}%` }}
              />
            </div>
          </div>

          <div className="next-step">
            <div className="next-step-icon">
              <Play size={17} />
            </div>

            <div>
              <small>NEXT STEP</small>
              <strong>
                {currentStep?.proof
                  ? "Awaiting proof review"
                  : currentStep?.title || "All steps approved"}
              </strong>
              <span>
                {currentStep?.proof
                  ? `${currentStep.title} proof is awaiting review in this session.`
                  : currentStep?.description ||
                    "Your project has no remaining steps."}
              </span>
            </div>

            <button
              className="small-button"
              onClick={() => navigate("roadmap")}
            >
              {currentStep?.proof ? "View proof" : "Continue"}
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        <aside className="dashboard-side">
          <div className="ai-tip card">
            <div className="tip-icon">
              <Lightbulb size={21} />
            </div>

            <span className="card-label">AI TIP</span>

            <h3>Build smaller, test faster.</h3>

            <p>
              Finish one feature completely before adding another.
              It makes debugging much easier.
            </p>

            <button
              className="text-button"
              onClick={() => navigate("assistant")}
            >
              Ask AI Assistant
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="activity card">
            <div className="card-header compact">
              <h3>Recent activity</h3>
              <button
                className="link-button"
                onClick={() => navigate("roadmap")}
              >
                View all
              </button>
            </div>

            {latestProof ? (
              <ActivityItem
                icon={<Upload size={15} />}
                title={`Proof submitted: ${latestProof.title}`}
                time={new Date(
                  latestProof.proof.submittedAt
                ).toLocaleString()}
              />
            ) : completedSteps > 0 ? (
              <ActivityItem
                icon={<Check size={15} />}
                title={`${completedSteps} roadmap step${
                  completedSteps === 1 ? "" : "s"
                } approved`}
                time="Based on your project roadmap"
              />
            ) : (
              <p className="empty-activity">
                No steps have been approved yet. Upload a proof photo
                for the current roadmap step to request review.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

/* =========================
   AI ASSISTANT
========================= */

function Assistant({
  project,
  setProject,
  navigate,
}) {
  const questions = [
    {
      key: "interest",
      text: "What area are you most interested in?",
      options: Object.keys(PROJECTS),
    },
    {
      key: "skills",
      text: "Which skills or technologies do you already know?",
      input: true,
    },
    {
      key: "level",
      text: "What is your current skill level?",
      options: ["Beginner", "Intermediate", "Advanced"],
    },
    {
      key: "type",
      text: "What kind of project would you prefer?",
      options: [
        "Web / App",
        "AI / Data",
        "Automation / IoT",
        "Security",
        "Any type",
      ],
    },
    {
      key: "time",
      text: "How much time can you spend on this project?",
      options: [
        "1–2 weeks",
        "2–3 weeks",
        "3–4 weeks",
        "1+ month",
      ],
    },
  ];

  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState({
    interest: "",
    skills: "",
    level: "",
    type: "",
    time: "",
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text:
        "Hi! I'm your Student Tech Hub AI Assistant. I'll ask you a few quick questions and recommend a project that matches your interests and skills.",
    },
  ]);

  const [input, setInput] = useState("");
  const [generated, setGenerated] = useState(false);

  const currentQuestion = questions[step];

  const addMessage = (sender, text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        sender,
        text,
      },
    ]);
  };

  const generateRecommendation = (finalAnswers) => {
    const baseProject =
      PROJECTS[finalAnswers.interest] ||
      PROJECTS["Web Development"];

    const knownSkills =
      finalAnswers.skills.trim() || "your existing skills";

    const personalizedProject = {
      ...baseProject,
      difficulty:
        finalAnswers.level || baseProject.difficulty,
      description:
        `${baseProject.description} This recommendation is personalized around ${knownSkills}.`,
    };

    setProject(personalizedProject);
    setGenerated(true);

    addMessage(
      "ai",
      `Great! Based on your answers, I recommend "${personalizedProject.title}". Your personalized project idea is ready on the right.`
    );
  };

  const handleChoice = (value) => {
    const finalAnswers = {
      ...answers,
      [currentQuestion.key]: value,
    };

    setAnswers(finalAnswers);
    addMessage("user", value);

    if (step === questions.length - 1) {
      generateRecommendation(finalAnswers);
      return;
    }

    const nextStep = step + 1;
    setStep(nextStep);

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-next`,
        sender: "ai",
        text: questions[nextStep].text,
      },
    ]);
  };

  const handleSkillsSubmit = () => {
    if (!input.trim()) return;

    handleChoice(input.trim());
    setInput("");
  };

  const restartAssistant = () => {
    setStep(0);

    setAnswers({
      interest: "",
      skills: "",
      level: "",
      type: "",
      time: "",
    });

    setMessages([
      {
        id: 1,
        sender: "ai",
        text:
          "Sure! Let's start again. What area are you most interested in?",
      },
    ]);

    setInput("");
    setGenerated(false);
  };

  const displayedProject = generated ? project : null;

  return (
    <div className="assistant-page page-container ai-assistant-page">
      <div className="assistant-heading">
        <span className="eyebrow">AI PROJECT ASSISTANT</span>

        <h1>
          Find a project that
          <br />
          fits <span>you.</span>
        </h1>

        <p>
          Chat with the assistant, answer a few questions, and get a
          personalized project recommendation.
        </p>
      </div>

      <div className="ai-chat-layout">
        {/* =========================
            CHATBOT
        ========================= */}
        <section className="card ai-chat-panel">
          <div className="ai-chat-header">
            <div className="ai-chat-avatar">
              <Sparkles size={19} />
            </div>

            <div>
              <strong>Student Tech AI</strong>
              <span>Personal Project Assistant</span>
            </div>

            <img
              className="ai-assistant-robot"
              src={`${import.meta.env.BASE_URL}ai-assistant-robot.png`}
              alt="A friendly robot waving toward the AI assistant"
            />

            <div className="ai-online">
              <span></span>
              Online
            </div>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`ai-message ${
                  message.sender === "user" ? "user" : "assistant"
                }`}
              >
                <div className="ai-message-bubble">
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {!generated ? (
            <div className="ai-question-area">
              <div className="ai-question-label">
                Question {step + 1} of {questions.length}
              </div>

              <h3>{currentQuestion.text}</h3>

              {currentQuestion.input ? (
                <div className="ai-chat-input-row">
                  <input
                    type="text"
                    value={input}
                    onChange={(event) =>
                      setInput(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSkillsSubmit();
                      }
                    }}
                    placeholder="Example: Python, React, Java..."
                    className="ai-chat-input"
                  />

                  <button
                    className="ai-send-button"
                    onClick={handleSkillsSubmit}
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>
              ) : (
                <div className="ai-option-grid">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      className="ai-option-button"
                      onClick={() => handleChoice(option)}
                    >
                      <span>{option}</span>
                      <ArrowRight size={14} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="ai-complete-area">
              <div>
                <CheckCircle2 size={19} />
                <span>Your project recommendation is ready.</span>
              </div>

              <button
                className="ai-restart-button"
                onClick={restartAssistant}
              >
                Start Again
              </button>
            </div>
          )}
        </section>

        {/* =========================
            PROJECT RESULT
        ========================= */}
        <aside className="card ai-result-panel">
          {!displayedProject ? (
            <div className="ai-result-empty">
              <div className="ai-result-icon">
                <Lightbulb size={24} />
              </div>

              <span className="eyebrow">YOUR RECOMMENDATION</span>

              <h2>
                Your project idea
                <br />
                will appear here.
              </h2>

              <p>
                Answer the questions in the AI assistant. Your
                personalized project will be generated here based on
                your interests, skills, experience and available time.
              </p>

              <div className="ai-result-points">
                <div>
                  <CheckCircle2 size={15} />
                  Interest based
                </div>

                <div>
                  <CheckCircle2 size={15} />
                  Skill matched
                </div>

                <div>
                  <CheckCircle2 size={15} />
                  Time friendly
                </div>
              </div>
            </div>
          ) : (
            <div className="ai-result-content">
              <div className="ai-result-top">
                <div className="ai-result-project-icon">
                  <ProjectIcon icon={displayedProject.icon} size={28} />
                </div>

                <div>
                  <span className="eyebrow">
                    RECOMMENDED PROJECT
                  </span>

                  <h2>{displayedProject.title}</h2>
                </div>
              </div>

              <p className="ai-result-description">
                {displayedProject.description}
              </p>

              <div className="ai-result-details">
                <div>
                  <span>LEVEL</span>
                  <strong>{displayedProject.difficulty}</strong>
                </div>

                <div>
                  <span>DURATION</span>
                  <strong>{displayedProject.duration}</strong>
                </div>
              </div>

              <div className="ai-fit-card">
                <div className="ai-fit-title">
                  <Target size={16} />
                  Why this fits you
                </div>

                <p>
                  This project matches your{" "}
                  <strong>{answers.interest}</strong> interest,
                  your{" "}
                  <strong>{answers.level}</strong> skill level,
                  and your preferred{" "}
                  <strong>{answers.time}</strong> timeline.
                </p>
              </div>

              <div className="ai-skills-section">
                <span>RECOMMENDED SKILLS</span>

                <div className="ai-skill-tags">
                  {displayedProject.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>

              <button
                className="ai-roadmap-button"
                onClick={() => navigate("roadmap")}
              >
                View Project Roadmap
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

/* =========================
   ROADMAP
========================= */

function Roadmap({
  project,
  navigate,
  steps,
  submitStepProof,
}) {
  const [popupOpen, setPopupOpen] = useState(false);
  const completedSteps = steps.filter(
    (step) => step.status === "done"
  ).length;
  const completionPercent = Math.round(
    (completedSteps / steps.length) * 100
  );

  return (
    <div className="page-container roadmap-page">
      <div className="roadmap-header">
        <div>
          <div className="eyebrow">
            <GitBranch size={15} />
            PROJECT ROADMAP
          </div>

          <h1>{project.title}</h1>

          <p>{project.description}</p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("assistant")}
        >
          Change Project
        </button>
      </div>

      <div className="roadmap-summary card">
        <div className="roadmap-summary-main">
          <span className="card-label">CURRENT PROGRESS</span>

          <div className="roadmap-progress-row">
            <strong>{completionPercent}%</strong>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${completionPercent}%` }}
              />
            </div>

            <span>{completedSteps} / {steps.length} steps</span>
          </div>
        </div>

        <div className="roadmap-tags">
          {project.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>

      <div className="timeline">
        {steps.map((step) => (
          <RoadStep
            key={step.number}
            step={step}
            submitStepProof={submitStepProof}
          />
        ))}
      </div>

      <div className="roadmap-bottom">
        <div className="why-box">
          <Lightbulb size={21} />

          <div>
            <strong>Why this step matters</strong>
            <p>
              {steps.find((step) => step.status === "active")
                ?.description ||
                `Every verified step brings ${project.title} closer to your portfolio.`}
            </p>
          </div>
        </div>
      </div>

      <button
        className="ai-floating-button"
        onClick={() => setPopupOpen((prev) => !prev)}
        aria-label="Open AI assistant help"
        title="Open AI assistant help"
      >
        <Sparkles size={21} />
      </button>

      {popupOpen && (
        <div className="ai-floating-popup">
          <div className="ai-floating-popup-header">
            <div>
              <strong>AI Assistant</strong>
              <span>Need help with your project?</span>
            </div>

            <button
              onClick={() => setPopupOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={16} />
            </button>
          </div>

          <p>
            Get a personalized project recommendation from the AI assistant.
          </p>

          <button
            onClick={() => {
              setPopupOpen(false);
              navigate("assistant");
            }}
            className="ai-popup-open-button"
          >
            Open Assistant
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

function RoadStep({ step, submitStepProof }) {
  const isDone = step.status === "done";
  const isActive = step.status === "active";
  const isLocked = step.status === "locked";
  const [proofFile, setProofFile] = useState(null);

  return (
    <div
      className={`road-step ${
        isActive ? "active" : ""
      } ${isDone ? "done" : ""} ${isLocked ? "locked" : ""}`}
    >
      <div className="timeline-marker">
        {isDone ? (
          <Check size={16} />
        ) : isLocked ? (
          <Lock size={15} />
        ) : (
          <span>{step.number}</span>
        )}
      </div>

      <div className="road-card card">
        <div className="road-card-top">
          <div>
            <span className="step-number">
              STEP {step.number}
            </span>

            <h3>{step.title}</h3>
          </div>

          <span
            className={`step-status ${
              step.proof && isActive ? "pending" : step.status
            }`}
          >
            {isDone
              ? "Completed"
              : isActive
              ? step.proof
                ? "Pending review"
                : "Current"
              : "Locked"}
          </span>
        </div>

        <p>{step.description}</p>

        {isActive && (
          <div className="proof-submission">
            {step.proof && (
              <div className="proof-preview">
                <img src={step.proof.previewUrl} alt="Submitted proof" />
                <div>
                  <strong>{step.proof.name}</strong>
                  <span>
                    Submitted{" "}
                    {new Date(step.proof.submittedAt).toLocaleString()} ·
                    awaiting reviewer approval
                  </span>
                </div>
              </div>
            )}

            <form
              className="proof-upload-form"
              onSubmit={(event) => {
                event.preventDefault();
                submitStepProof(step.number, proofFile);
                setProofFile(null);
                event.currentTarget.reset();
              }}
            >
              <label className="proof-file-input">
                <Upload size={16} />
                <span>
                  {proofFile
                    ? proofFile.name
                    : step.proof
                      ? "Choose another photo"
                      : "Choose a proof photo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setProofFile(event.target.files?.[0] || null)
                  }
                  aria-label={`Choose photo proof for ${step.title}`}
                />
              </label>
              <button
                className="small-button"
                type="submit"
                disabled={!proofFile}
              >
                {step.proof ? "Replace proof" : "Submit for review"}
                <ArrowRight size={15} />
              </button>
            </form>
            <p className="proof-review-note">
              Demo mode: your photo stays in this browser session. It is
              not sent to a reviewer, and the step will remain pending
              until a reviewer workflow is connected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   PORTFOLIO
========================= */

function Portfolio({
  project,
  navigate,
  projectCompleted,
  links,
  updateProjectLink,
}) {
  const [shareNotice, setShareNotice] = useState("");
  const githubUrl = getValidWebUrl(links.github || "");
  const demoUrl = getValidWebUrl(links.demo || "");

  const downloadReport = () => {
    const report = createProjectReportPdf(
      project,
      { github: githubUrl, demo: demoUrl },
      projectCompleted
    );
    const reportUrl = URL.createObjectURL(report);
    const downloadLink = document.createElement("a");
    const fileName = project.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    downloadLink.href = reportUrl;
    downloadLink.download = `${fileName || "project"}-report.pdf`;
    downloadLink.click();
    window.setTimeout(() => URL.revokeObjectURL(reportUrl), 1000);
    setShareNotice("Your project report PDF has been downloaded.");
  };

  const shareProject = async () => {
    const shareText = [
      `${project.title} — ${project.description}`,
      githubUrl ? `GitHub: ${githubUrl}` : "",
      demoUrl ? `Live demo: ${demoUrl}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const shareData = {
      title: project.title,
      text: shareText,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareNotice("Project shared successfully.");
        return;
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(
        `${shareText}\nPortfolio: ${window.location.href}`
      );
      setShareNotice("Project details copied. Ready to share!");
    } catch {
      setShareNotice(
        "Sharing is unavailable in this browser. Please copy the project links manually."
      );
    }
  };

  return (
    <div className="page-container simple-page">
      <div className="simple-heading">
        <div>
          <div className="eyebrow">
            <Folder size={15} />
            YOUR PORTFOLIO
          </div>

          <h1>Show what you have built.</h1>

          <p>
            Keep your best work organized and ready to share.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            alert("Portfolio project editor coming soon.")
          }
        >
          Add Project
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="portfolio-grid">
        <div className="portfolio-card card">
          <div className="portfolio-image project-image-ai">
            <div className="project-emblem">
              <ProjectIcon icon={project.icon} size={48} />
            </div>
          </div>

          <div className="portfolio-content">
            <div className="portfolio-title-row">
              <div>
                <span className="card-label">
                  CURRENT PROJECT
                </span>
                <h3>{project.title}</h3>
              </div>

              <span
                className={`status-pill ${
                  projectCompleted ? "completed" : ""
                }`}
              >
                {projectCompleted ? "Completed" : "In Progress"}
              </span>
            </div>

            <p>{project.description}</p>

            {projectCompleted && (
              <div
                className="portfolio-celebration"
                role="status"
              >
                <div className="portfolio-celebration-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <strong>Project complete! You did it!</strong>
                  <span>
                    Your hard work is ready to shine in your portfolio.
                  </span>
                </div>
                <span
                  className="celebration-stars"
                  aria-hidden="true"
                >
                  ✦ ✧ ✦
                </span>
              </div>
            )}

            <div className="skill-list">
              {project.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <div className="portfolio-showcase">
              <div className="portfolio-project-links">
                <label className="portfolio-link-field">
                  <span>
                    <GitBranch size={15} />
                    GitHub repository
                  </span>
                  <div className="portfolio-link-input">
                    <input
                      type="url"
                      value={links.github || ""}
                      onChange={(event) =>
                        updateProjectLink(
                          project.title,
                          "github",
                          event.target.value
                        )
                      }
                      placeholder="https://github.com/..."
                      aria-label="GitHub repository URL"
                    />
                    {githubUrl && (
                      <a
                        className="portfolio-link-open"
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open GitHub repository"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </label>

                <label className="portfolio-link-field">
                  <span>
                    <Link size={15} />
                    Live demo
                  </span>
                  <div className="portfolio-link-input">
                    <input
                      type="url"
                      value={links.demo || ""}
                      onChange={(event) =>
                        updateProjectLink(
                          project.title,
                          "demo",
                          event.target.value
                        )
                      }
                      placeholder="https://your-project.com"
                      aria-label="Live demo URL"
                    />
                    {demoUrl && (
                      <a
                        className="portfolio-link-open"
                        href={demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open live demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </label>
              </div>

              <div className="portfolio-showcase-actions">
                <button
                  className="secondary-button"
                  onClick={downloadReport}
                >
                  <Download size={16} />
                  Download Project Report
                </button>
                <button
                  className="primary-button"
                  onClick={shareProject}
                >
                  <Share2 size={16} />
                  Share Project
                </button>
              </div>

              {shareNotice && (
                <p className="portfolio-share-notice" role="status">
                  {shareNotice}
                </p>
              )}
            </div>

            <button
              className="text-button"
              onClick={() => navigate("roadmap")}
            >
              View roadmap
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="portfolio-card empty-portfolio card">
          <div className="empty-icon">
            <Folder size={24} />
          </div>

          <h3>More projects will appear here.</h3>

          <p>
            Complete projects and keep adding them to build a
            stronger student portfolio.
          </p>

          <button
            className="secondary-button"
            onClick={() => navigate("assistant")}
          >
            Find a new project
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   PROFILE
========================= */

function Profile({ navigate }) {
  return (
    <div className="page-container profile-page">
      <div className="profile-header card">
        <div className="profile-avatar">
          <UserCircle size={58} />
        </div>

        <div className="profile-main">
          <span className="card-label">STUDENT PROFILE</span>
          <h1>Tech Builder</h1>
          <p>
            Keep learning, keep building, and keep improving.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() =>
            alert("Profile editing coming soon.")
          }
        >
          Edit Profile
        </button>
      </div>

      <div className="profile-grid">
        <div className="profile-stat card">
          <span>Projects</span>
          <strong>04</strong>
          <small>2 published</small>
        </div>

        <div className="profile-stat card">
          <span>Skills</span>
          <strong>12</strong>
          <small>Across 4 domains</small>
        </div>

        <div className="profile-stat card">
          <span>Learning streak</span>
          <strong>12</strong>
          <small>Days</small>
        </div>
      </div>

      <div className="profile-section card">
        <div className="card-header compact">
          <div>
            <span className="card-label">YOUR JOURNEY</span>
            <h2>Keep building consistently.</h2>
          </div>

          <Target size={22} />
        </div>

        <div className="profile-progress">
          <div>
            <span>Overall learning progress</span>
            <strong>72%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: "72%" }}
            />
          </div>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("dashboard")}
        >
          Back to Dashboard
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

/* =========================
   REUSABLE COMPONENTS
========================= */

function FeatureCard({ icon, title, text, tone, featured = false }) {
  return (
    <div
      className={`feature-card card feature-card-${tone} ${
        featured ? "featured" : ""
      }`}
    >
      <div className={`feature-icon feature-icon-${tone}`}>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function ProjectIcon({ icon: Icon, size }) {
  return <Icon aria-hidden="true" size={size} strokeWidth={1.9} />;
}

function PreviewStep({
  number,
  text,
  done = false,
  active = false,
}) {
  return (
    <div
      className={`preview-step ${
        active ? "active" : ""
      }`}
    >
      <div className="preview-step-number">
        {done ? <Check size={13} /> : number}
      </div>

      <span>{text}</span>

      {active && <ArrowRight size={15} />}
    </div>
  );
}

function StatCard({
  icon,
  tone,
  value,
  label,
  note,
}) {
  return (
    <div className="stat-card card">
      <div className={`stat-icon stat-icon-${tone}`}>{icon}</div>

      <div className="stat-value">{value}</div>

      <div className="stat-label">{label}</div>

      <small>{note}</small>
    </div>
  );
}

function ActivityItem({
  icon,
  title,
  time,
}) {
  return (
    <div className="activity-item">
      <div className="activity-icon">{icon}</div>

      <div>
        <strong>{title}</strong>
        <span>{time}</span>
      </div>
    </div>
  );
}

function BottomNavigation({ page, navigate }) {
  const items = [
    { id: "dashboard", label: "Dashboard" },
    { id: "assistant", label: "AI Assistant" },
    { id: "roadmap", label: "Roadmap" },
    { id: "portfolio", label: "Portfolio" },
  ];

  return (
    <div className="bottom-navigation">
      {items.map((item) => (
        <button
          key={item.id}
          className={page === item.id ? "active" : ""}
          onClick={() => navigate(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>Student Tech Hub</strong>
        <span>
          A focused space for students who want to build.
        </span>
      </div>

      <span className="footer-copy">
        © 2026 Student Tech Hub
      </span>
    </footer>
  );
}

export default App;