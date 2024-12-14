using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {

        private readonly OnBoardingContext _context;

        public SalesController(OnBoardingContext context)
        {
            _context = context;
        }


        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dtos.SalesDto>>> GetSales()
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


        // GET: api/Sales/7
        [HttpGet("{id}")]
        public async Task<ActionResult<Dtos.SalesDto>> GetSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);

            if (sales == null)
            {
                return NotFound();
            }

            return Mappers.SalesMapper.EntityToDto(sales);
        }


        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSales(Dtos.SalesDto sales)
        {
            var entity = Mappers.SalesMapper.DtoToEntity(sales);

            _context.Sales.Add(entity);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSales", new { id = sales.Id }, Mappers.SalesMapper.EntityToDto(entity));
        }

        // DELETE: api/Sales/7
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSales(int id)
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
