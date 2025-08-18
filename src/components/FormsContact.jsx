
export default function FormsContact() {
 function signUp(formData) {
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email")
    const message = formData.get("message")
    console.log("Form submitted with data:", { firstName, lastName, email, message });
    // Here you can handle the form submission, e.g., send data to an API or server
    // For now, we just log the data to the console
  }



  return (
    <section className="container form_contact">
      <h1 className="form_title">Contact us</h1>
      <form action={signUp}>

         <label htmlFor="firstName">Name:</label>
        <input id="firstName" 
        defaultValue="Carolina" 
        type="name" 
        name="name" 
        aria-label="name"
        placeholder="Carolina" />

         <label htmlFor="lastName">last name:</label>
        <input id="lastName" defaultValue="Gonzalves" type="name" name="lastName" aria-label="lastName" placeholder="Gonzalves" />

        <label htmlFor="email">Email:</label>
        <input id="email" defaultValue="joe@schmoe.com" type="email" name="email" aria-label="Name"placeholder="joe@schmoe.com" />
        
        <label htmlFor="description">Message:</label>
        <textarea id="description" name="message" defaultValue="This is a description"></textarea>

        
        <button className="button_submit">Submit</button>

      

      </form>
    </section>
  )
}




