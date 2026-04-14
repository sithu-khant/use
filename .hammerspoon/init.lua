-- `cmd + 2` opens Brave browser, etc...

local apps = {
  ["2"] = "Brave Browser",
  ["3"] = "VSCodium",
  ["4"] = "Terminal"
}

for key, app in pairs(apps) do
  hs.hotkey.bind({"cmd"}, key, function()
    hs.application.launchOrFocus(app)
  end)
end
