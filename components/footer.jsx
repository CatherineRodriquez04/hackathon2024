"use client"

const Footer = () => {
    const isDarkMode = false;
    // const [isDarkMode, setIsDarkMode] = useState(false);

    // useEffect(() => {
    //     // Check for the dark mode class on the root element (html)
    //     const darkModeEnabled = document.documentElement.classList.contains('dark');
    //     setIsDarkMode(darkModeEnabled);

    //     // Optionally, listen for class changes if dark mode toggles dynamically
    //     const observer = new MutationObserver(() => {
    //         const darkModeEnabled = document.documentElement.classList.contains('dark');
    //         setIsDarkMode(darkModeEnabled);
    //     });

    //     // Observe changes on the `class` attribute of the <html> element
    //     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    //     return () => {
    //         observer.disconnect();
    //     };
    // }, []);

    return (
        <footer className={`footerBg ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="py-6 mt-12 container mx-auto flex flex-col md:flex-row justify-between px-2">
                <div>
                    <h2 className="text-2xl font-russo text-accent">Hackathon24</h2>
                    <p className="font-russo">add later</p>
                    
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-russo">Resources</h3>
                    
                </div>
            </div>
            <div className="text-center mt-4">
                <p className="text-sm ">&copy; 2024 Hackathon</p>
            </div>
        </footer>
    );
};

export default Footer;