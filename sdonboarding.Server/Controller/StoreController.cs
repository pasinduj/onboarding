using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly OnBoardingContext _context;
        private readonly ILogger<StoreController> _logger;

        public StoreController(OnBoardingContext context, ILogger<StoreController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Store
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dtos.StoreDto>>> GetStores()
        {
            try
            {
                var _stores = await _context.Stores.Select(s => Mappers.StoreMapper.EntityToDto(s)).ToListAsync();

                if (_stores.Count > 0)
                {
                    return Ok(_stores);
                }
                else
                {
                    return BadRequest("There are no stores at the moment");
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred while processing your request.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        // GET: api/Store/7
        [HttpGet("{id}")]
        public async Task<ActionResult<Dtos.StoreDto>> GetStore(int id)
        {
            if (id <= 0)  // Check if id is invalid (0 or negative)
            {
                return BadRequest("Invalid store ID.");
            }
            else
            {
                try
                {
                    var store = await _context.Stores.FindAsync(id);

                    if (store == null)
                    {
                        return NotFound();
                    }

                    return Mappers.StoreMapper.EntityToDto(store);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "An error occurred while processing your request.");
                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }
        }

        // POST: api/Store
       
        [HttpPost]
        public async Task<ActionResult<Store>> PostStore(Dtos.StoreDto store)
        {
            try
            {
                var entity = Mappers.StoreMapper.DtoToEntity(store);

            _context.Stores.Add(entity);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStore", new { id = store.Id }, Mappers.StoreMapper.EntityToDto(entity));

            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred while processing your request.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        // DELETE: api/Store/7
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStore(int id)
        {
            if (id <= 0)  // Check if id is invalid (0 or negative)
            {
                return BadRequest("Invalid store ID.");
            }
            else {
                try
                {
                    var store = await _context.Stores.FindAsync(id);
                    if (store == null)
                    {
                        return NotFound();
                    }

                    _context.Stores.Remove(store);
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


        // PUT: api/Store/7

        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore(int id, Dtos.StoreDto store)
        {
            if (id != store.Id)
            {
                return BadRequest();
            }
            var entity = Mappers.StoreMapper.DtoToEntity(store);

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(Mappers.StoreMapper.EntityToDto(entity));
        }


        private bool StoreExists(int id)
        {
            return _context.Stores.Any(e => e.Id == id);
        }

    }
}
