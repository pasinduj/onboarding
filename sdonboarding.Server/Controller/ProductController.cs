using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly OnBoardingContext _context;

        public ProductController(OnBoardingContext context)
        {
            _context = context;
        }


        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dtos.ProductDto>>> GetProducts()
        {
            var _products = await _context.Products.Select(s => Mappers.ProductMapper.EntityToDto(s)).ToListAsync();

            if (_products.Count > 0)
            {
                return Ok(_products);
            }
            else
            {
                return BadRequest("There are no products at the moment");
            }
        }

        // GET: api/Product/7
        [HttpGet("{id}")]
        public async Task<ActionResult<Dtos.ProductDto>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Mappers.ProductMapper.EntityToDto(product);
        }


        // PUT: api/Product/7

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Dtos.ProductDto product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }
            var entity = Mappers.ProductMapper.DtoToEntity(product);

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(Mappers.ProductMapper.EntityToDto(entity));
        }



        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }


        // POST: api/Product
       
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Dtos.ProductDto product)
        {
            var entity = Mappers.ProductMapper.DtoToEntity(product);

            _context.Products.Add(entity);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, Mappers.ProductMapper.EntityToDto(entity));
        }

        // DELETE: api/Product/7
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
