import React,{Component} from 'react'
//import './ComponentToPrint.css'
class ComponentToPrint extends Component{


    render(){

        return(

		
			<div>

            <header>
            <h1>Invoice</h1>
            <address contenteditable>
				<p>Binod Shrestha</p>
				<p>Alchemist.com<br />Orange, CA 92866</p>
				<p>(+977) 9813126855 </p>
			</address>
			</header>

            <article>
			<h1>Recipient</h1>
			<address contenteditable>
				<p><b>Bill To</b><br />Jarvis Hendry</p>
                <p>jarvish123@gmail.com</p>
			</address>
            
            <table class="meta">
				<tr>
					<th><span contenteditable>Invoice #</span></th>
					<td><span contenteditable>101138</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Date</span></th>
					<td><span contenteditable>January 1, 2012</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Amount Due</span></th>
					<td><span id="prefix" contenteditable>$</span><span>600.00</span></td>
				</tr>
			</table>
			<table class="inventory">
				<thead>
					<tr>
						<th><span contenteditable>Date</span></th>
						<th><span contenteditable>Description</span></th>
						<th><span contenteditable>Hours</span></th>
						<th><span contenteditable>Rate</span></th>
						<th><span contenteditable>Amount</span></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><a class="cut">-</a><span contenteditable>Jan 23,2019</span></td>
						<td><span contenteditable>Experience Review</span></td>
						<td><span data-prefix>$</span><span contenteditable>150.00</span></td>
						<td><span contenteditable>4</span></td>
						<td><span data-prefix>$</span><span>600.00</span></td>
					</tr>
				</tbody>
			</table>
			
			<table class="balance">
				<tr>
					<th><span contenteditable>Total</span></th>
					<td><span data-prefix>$</span><span>600.00</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Amount Paid</span></th>
					<td><span data-prefix>$</span><span contenteditable>0.00</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Balance Due</span></th>
					<td><span data-prefix>$</span><span>600.00</span></td>
				</tr>
			</table>

        </article>
            <aside>
			<h1><span contenteditable>Additional Notes</span></h1>
			<div contenteditable>
				<p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
			</div>
		</aside>
            </div>
		
        )
    }
}

export default ComponentToPrint