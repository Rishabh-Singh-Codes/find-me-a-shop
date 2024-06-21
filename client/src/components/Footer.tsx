const Footer = () => {
    return (
        <div className="bg-gradient-to-t from-orange-400 py-10 relative">
            <div className="container mx-auto flex-auto flex justify-between items-center">
                <span className="text-xl md:text-3xl font-bold tracking-tight">Find Me A Coffee Shop</span>
                <span className="font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer text-xs md:text-base">Privacy Policy</p>
                    <p className="cursor-pointer text-xs md:text-base">Terms of Service</p>
                </span>
            </div>
        </div>
    )
}

export default Footer;