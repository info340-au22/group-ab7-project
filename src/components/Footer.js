

export default function Footer() {
return(
    <footer>
        <div className="container">
        <div className="row">
            <div className="col-4 pt-3">
            <p className="bolded">Authors</p>
            <p>Mustafa Mohamud Abdulkadir</p>
            <p>Travon Dragon Dao</p>
            <p>Zelin He</p>
            <p>Zhuyi Gu</p>
            </div>

            <div className="col-4 pt-3">
            <p className="bolded">Email</p>
            <p><a href="mailto:Mabdul3@uw.edu">Mabdul3@uw.edu</a></p>
            <p><a href="mailto:tdao09@uw.edu">tdao09@uw.edu</a></p>
            <p><a href="mailto:zelinh2@uw.edu ">zelinh2@uw.edu</a></p>
            <p><a href="mailto:zhuyi@uw.edu">Zhuyi@uw.edu</a></p>
            </div>

            <div className="col-4 pt-3">
            <p className="bolded">Phone Number</p>
            <p><a href="tel:123-456-7890">(123) 456-7890</a></p>
            <p><a href="tel:123-456-7890">(123) 456-7890</a></p>
            <p><a href="tel:123-456-7890">(123) 456-7890</a></p>
            <p><a href="tel:123-456-7890">(123) 456-7890</a></p>
            </div>

            <form></form>
        </div>
        </div>

        <p className="text-center m-0">Subscribe to our Email!</p>
        <div className="centering">
        <form>

            <label className="p-3 " htmlFor="email_input ">Email:</label>
            <input id="email_input " type="email " name="email
            " placeholder="email@domain.com "/>
            <button type="button ">Submit</button>

        </form>
        </div>
        <p className="copyrighted centered "> &copy2022 West Coast Tourist Recommendations</p>
    </footer>);
}