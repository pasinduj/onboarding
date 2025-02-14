using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {

        private readonly OnBoardingContext _context;
        private readonly ILogger<SalesController> _logger;

        public SalesController(OnBoardingContext context, ILogger<SalesController> slogger)
        {
            _context = context;
            _logger = slogger;
        }


        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dtos.SalesDto>>> GetSales()
        {
            try
            {
                var _sales = await _context.Sales.Select(s => Mappers.SalesMapper.EntityToDto(s)).ToListAsync();

                if (_sales.Count > 0)
                {
                    return Ok(_sales);
                }
                else
                {
                    return BadRequest("There are no Sales at the moment");
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred while processing your request.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        // GET: api/Sales/7
        [HttpGet("{id}")]
        public async Task<ActionResult<Dtos.SalesDto>> GetSales(int id)
        {
            if (id <= 0)  // Check if id is invalid (0 or negative)
            {
                return BadRequest("Invalid store ID.");
            }
            else
            {

                try
                {
                    var sales = await _context.Sales.FindAsync(id);

                    if (sales == null)
                    {
                        return NotFound();
                    }

                    return Mappers.SalesMapper.EntityToDto(sales);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "An error occurred while processing your request.");
                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }
        }


        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSales(Dtos.SalesDto sales)
        {
            try
            {
                var entity = Mappers.SalesMapper.DtoToEntity(sales);

                _context.Sales.Add(entity);

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetSales", new { id = sales.Id }, Mappers.SalesMapper.EntityToDto(entity));
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred while processing your request.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        // DELETE: api/Sales/7
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSales(int id)
        {

            if (id <= 0)  // Check if id is invalid (0 or negative)
            {
                return BadRequest("Invalid store ID.");
            }
            else
            {
                try
                {

                    var sale = await _context.Sales.FindAsync(id);
                    if (sale == null)
                    {
                        return NotFound();
                    }

                    _context.Sales.Remove(sale);
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


        // PUT: api/Sales/7

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales(int id, Dtos.SalesDto sale)
        {
            if (id != sale.Id)
            {
                return BadRequest();
            }
            var entity = Mappers.SalesMapper.DtoToEntity(sale);

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(Mappers.SalesMapper.EntityToDto(entity));
        }


        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }

    }
}
