import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import classNames from 'classnames';
import './Calendar.css';
import '../components/Button.css';

// Manual Calendar Implementation
// Since we can't install react-day-picker, waiting building a full one is risky.
// We will build a "good enough" simple calendar view or just a placeholder if complex.
// Let's build a simple one for the current month view.

const Calendar = ({ className, showOutsideDays, mode, selected, onSelect, ...props }) => {
    const [currentDate, setCurrentDate] = React.useState(new Date());

    // Helper to get days in month
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const handleDateClick = (day) => {
        if (onSelect) {
            onSelect(new Date(year, month, day));
        }
    };

    const isSelected = (day) => {
        if (!selected) return false;
        const d = new Date(year, month, day);
        return d.toDateString() === new Date(selected).toDateString();
    };

    const isToday = (day) => {
        const d = new Date(year, month, day);
        return d.toDateString() === new Date().toDateString();
    };

    const renderDays = () => {
        const days = [];
        // Empty cells for padding
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-cell" />);
        }
        // Days
        for (let d = 1; d <= daysInMonth; d++) {
            days.push(
                <div key={d} className="calendar-cell">
                    <button
                        className={classNames(
                            'btn btn-size-icon calendar-day',
                            isSelected(d) && 'calendar-day-selected',
                            isToday(d) && !isSelected(d) && 'calendar-day-today'
                        )}
                        onClick={() => handleDateClick(d)}
                    >
                        {d}
                    </button>
                </div>
            );
        }
        return days;
    };

    return (
        <div className={classNames('calendar-root', className)} {...props}>
            <div className="calendar-caption">
                <div className="calendar-nav absolute left-0 right-0 flex justify-between px-2">
                    <button onClick={handlePrevMonth} className="btn btn-variant-ghost btn-size-icon calendar-nav-button">
                        <ChevronLeft className="calendar-nav-icon" />
                    </button>
                    <button onClick={handleNextMonth} className="btn btn-variant-ghost btn-size-icon calendar-nav-button">
                        <ChevronRight className="calendar-nav-icon" />
                    </button>
                </div>
                <div className="calendar-caption-label">
                    {monthNames[month]} {year}
                </div>
            </div>
            <div className="calendar-table mt-4">
                <div className="calendar-head-row flex mb-2">
                    {['Sn', 'Mn', 'Tu', 'Wd', 'Th', 'Fr', 'St'].map(d => (
                        <div key={d} className="calendar-head-cell flex justify-center w-[2rem]">{d}</div>
                    ))}
                </div>
                <div className="calendar-row grid grid-cols-7 gap-y-2">
                    {renderDays()}
                </div>
            </div>
        </div>
    );
};

export { Calendar };
