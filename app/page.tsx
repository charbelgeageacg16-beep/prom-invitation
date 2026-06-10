"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [teacherName, setTeacherName] = useState("Teacher");
  const [attendance, setAttendance] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("teacherName");

    if (!storedName) {
  router.push("/login");
  return;
}
setTeacherName(storedName);
    const alreadySubmitted = localStorage.getItem("attendanceSubmitted");

    if (alreadySubmitted === "true") {
      setSubmitted(true);
    }
    const targetDate = new Date("2026-07-23T20:00:00");

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);

        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) /
          (1000 * 60)
        ),
        seconds: Math.floor(
          (distance % (1000 * 60)) /
          1000
        ),
      });
    }, 1000);

    return () => clearInterval(interval);
}, []);

const submitAttendance = () => {

  if (!attendance) {
    alert("Please select Accept or Decline.");
    return;
  }
  const formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfOrOYH-YppsQHHtGsvOCJnR7sewOUl59zzPSPWQBNkFzg6cQ/formResponse";

  const formData = new FormData();

  formData.append("entry.829860344", teacherName);
  formData.append("entry.772494640", attendance);

  fetch(formURL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });
  localStorage.setItem("attendanceSubmitted", "true");
  setSubmitted(true);
};
  return (
    <main className="min-h-screen bg-[url('/Background.jpg')] bg-cover bg-top text-white">

      {/* Hero Card */}
      <section className="py-16 flex justify-center">
        <div className="w-full max-w-md p-8 text-center">

          <p className="text-lg mb-4">
            Celebrate Our
          </p>

          <h1 className="text-5xl font-extrabold text-amber-300 tracking-wide mb-8">
            SENIOR
            <br />
            PROM
            <br />
            2026
          </h1>

          <img
            src="/graduation.jpg"
            alt="Prom"
            className="w-full h-64 object-cover rounded-2xl mb-8"
          />

          <p className="text-2xl italic text-white">
            A Night To Remember
          </p>

        </div>
      </section>

      {/* Invitation Section */}
      <section className="max-w-3xl mx-auto px-6 text-center mb-20">

        <h2 className="text-5xl italic text-white mb-8">
          Invitation
        </h2>

        <p className="text-2xl font-semibold mb-6">
          Dear {teacherName === "George Bouchaaya" ? "Father George Bouchaaya" : teacherName},
        </p>

        <p className="text-lg leading-relaxed text-white">
          We are honored to invite you to celebrate this special
          occasion with the graduating class of 2026.
          Your presence would make this evening even more memorable.
        </p>

      </section>

      {/* Event Details */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-24">

        <p className="text-2xl mb-2 tracking-widest">JULY</p>

        <div className="flex justify-center items-center gap-6">

          <div>
            <hr className="w-20 mb-2" />
            <p className="font-semibold">THURSDAY</p>
            <hr className="w-20 mt-2" />
          </div>

          <div>
          <p className="text-7xl font-bold">23</p>
          </div>

        <div>
          <hr className="w-20 mb-2" />
          <p className="font-semibold">8:00 PM</p>
          <hr className="w-20 mt-2" />
        </div>

      </div>

      <p className="text-2xl mt-4">2026</p>

    </section>
    
    {/* Countdown */}
    <section className="max-w-4xl mx-auto px-6 text-center mb-24">

      <h2 className="text-5xl italic text-white mb-6">
        Countdown
      </h2>

      <p className="text-lg text-white mb-10">
         The big day is almost here 🎉
      </p>

      <div className="flex justify-center gap-10">

        <div>
          <p className="text-6xl font-bold">{timeLeft.days}</p>
          <p className="mt-2">Days</p>
        </div>

        <div>
          <p className="text-6xl font-bold">{timeLeft.hours}</p>
          <p className="mt-2">Hours</p>
        </div>

        <div>
          <p className="text-6xl font-bold">{timeLeft.minutes}</p>
          <p className="mt-2">Minutes</p>
        </div>

        <div>
          <p className="text-6xl font-bold">{timeLeft.seconds}</p>
          <p className="mt-2">Seconds</p>
        </div>

      </div>

    </section>
    {/* Location */}
    <section className="max-w-4xl mx-auto px-6 text-center mb-24">

      <h2 className="text-5xl italic text-white mb-6">
         Location
      </h2>

      <p className="text-2xl font-semibold mb-2">
         ELYSIUM RESORT & VENUE
      </p>

      <p className="text-white">
         Feitroun, keserwan
      </p>

      <a
        href="https://maps.app.goo.gl/GNRg1qEk6pER3SRo9"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 border-2 border-black rounded-full px-8 py-3 hover:bg-black hover:text-white transition"
      >
        View on Google Maps
      </a>

    </section>

    <section className="text-center py-20">
      <h2 className="text-5xl italic mb-8">
        Explore The Venue
      </h2>

      <a
        href="https://www.instagram.com/elysium_resortandvenue?igsh=YXBveGxjZ3NlZjRl"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block border-2 border-black rounded-full px-12 py-4"
      >
        View Venue Photos
      </a>
    </section>

    {submitted ? (
  <section className="text-center py-20">
    <h2 className="text-5xl italic mb-8">
      Thank You
    </h2>

    <p className="text-2xl">
      Your response has been recorded successfully.
    </p>
  </section>
) : (
  <section className="text-center py-20">
    <h2 className="text-6xl italic mb-8">
      Attendance
    </h2>

    <h3 className="text-3xl font-bold mb-6">
      Dear {teacherName === "George Bouchaaya" ? "Father George Bouchaaya" : teacherName},
    </h3>

    <p className="text-xl mb-10">
      Kindly confirm your attendance.
    </p>

    <div className="flex flex-col gap-4 items-center mb-10">
      <label className="text-xl">
        <input
          type="radio"
          name="attendance"
          value="Accept"
          onChange={(e) => setAttendance(e.target.value)}
        />
        {" "}Accept
      </label>

      <label className="text-xl">
        <input
          type="radio"
          name="attendance"
          value="Decline"
          onChange={(e) => setAttendance(e.target.value)}
        />
        {" "}Decline
      </label>
    </div>

    <button
      onClick={submitAttendance}
      className="border-2 border-black rounded-full px-10 py-3"
    >
      Confirm Attendance
    </button>
  </section>
)}

    <section className="text-center py-24">
      <h2 className="text-6xl italic mb-8">
        Thank You
      </h2>

      <p className="text-2xl italic max-w-3xl mx-auto">
        “We’re truly grateful to have you share this beautiful celebration with us.”
      </p>

      <p className="text-xl mt-8">
        Class of 2026
      </p>
    </section>

    <section className="text-center pb-20">
      <p className="text-red-600 italic text-lg">
        RSVP closes on: July 15, 2026
      </p>
    </section>

    <footer className="text-center py-6 text-sm text-yellow-300">
      Developed by Charbel Geagea
    </footer>
    </main>
  );
}

