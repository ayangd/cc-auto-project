---@param modname string
local function httpRequire(modname)
    local defaultHost = '~YOUR_DEFAULT_HOST_REPLACE~'
    local defaultPath = '~YOUR_DEFAULT_HOST_PATH_REPLACE~'
    local modnameTries = {
        modname,
        table.concat({ 'http://', defaultHost, defaultPath, '/', modname }),
        table.concat({ 'https://', defaultHost, defaultPath, '/', modname }),
    }
    for i = 1, 3 do
        table.insert(modnameTries, modnameTries[i] .. '.lua')
    end

    local modnameTryPosition = 1
    local request
    while modnameTryPosition < #modnameTries + 1 do
        request = http.get(modnameTries[modnameTryPosition])
        if request ~= nil then
            break
        end
        modnameTryPosition = modnameTryPosition + 1
    end
    if request == nil then
        error('Cannot find remote module: ' .. modname, 2)
    end
    ---@type string
    local luaString = request.readAll()
    request.close()
    local result, errorMessage = load(luaString, '=' .. modname, "t")
    if not result then
        error('Error loading module: ' .. errorMessage, 2)
    end
    return result
end

table.insert(package.loaders, httpRequire)

print('helo')
local modtest = require('test')
modtest.test()
