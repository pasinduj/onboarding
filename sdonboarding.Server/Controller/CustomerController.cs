using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        private readonly OnBoardingContext _context;
        private readonly ILogger<CustomerController> _logger;

        public CustomerController(OnBoardingContext context, ILogger<CustomerController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dtos.CustomerDto>>> GetCustomers()
        {
            try
            {
                var _customers = await _context.Customers.Select(s => Mappers.CustomerMapper.EntityToDto(s)).ToListAsync();

                if (_customers.Count > 0)
                {
                    return Ok(_customers);
                }
                else
                {
                    return BadRequest("There are no customers at the moment");
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred while processing your request.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        // GET: api/Customer/7
        [HttpGet("{id}")]
        public async Task<ActionResult<Dtos.CustomerDto>> GetCustomer(int id)
        {
            if (id <= 0)  // Check if id is invalid (0 or negative)
            {
                return BadRequest("Invalid store ID.");
            }
            else
            {
                try
                {
                    var customer = await _context.Customers.FindAsync(id);

                    if (customer == null)
                    {
                        return NotFound();
                    }

                    return Mappers.CustomerMapper.EntityToDto(customer);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "An error occurred while processing your request.");
                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }
        }


        // PUT: api/Customer/7
      
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Dtos.CustomerDto customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }
            var entity = Mappers.CustomerMapper.DtoToEntity(customer);

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(Mappers.CustomerMapper.EntityToDto(entity));
        }


        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }


        // POST: api/Customer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Dtos.CustomerDto customer)
        {
            try
            {
                var entity = Mappers.CustomerMapper.DtoToEntity(customer);

                _context.Customers.Add(entity);

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetCustomer", new { id = customer.Id }, Mappers.CustomerMapper.EntityToDto(entity));
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred while processing your request.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }



        // DELETE: api/Customer/7
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(id);
                if (customer == null)
                {
                    return NotFound();
                }

                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred while processing your request.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


    }
}
